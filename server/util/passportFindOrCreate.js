import Users from '../models/Users';

/**
 * passportFindOrCreate() is used for all OAuth verification
 * methods. The function will check if a User exists with the current
 * email methods and if the User does exist it'll pass the user
 * to the OAuth callback that sets an authenticated JWT token cookie.
 * Otherwise, we create a new user and pass that to the callback
 */
export function passportFindOrCreate(accessToken, refreshToken, profile, done) {
  const isTwitter = profile.provider === 'twitter';
  const isFacebook = profile.provider === 'facebook';
  const isGoogle = profile.provider === 'google';
  const isGithub = profile.provider === 'github';

  // Need to handle Twitter irregularities
  const email = isTwitter ? profile._json.email : profile.emails[0].value;
  Users.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      // Logic needed to handle non-standardized auth info :\
      let fullName =
        (profile.displayName && profile.displayName.split[' ']) || [];

      if (isTwitter) {
        fullName = [profile.username, 'Twitter'];
      }

      const firstName = fullName[0] || profile.name.givenName;
      const lastName = fullName[1] || profile.name.familyName;

      const newUser = new Users({
        email,
        firstName,
        lastName,
        provider: profile.provider,
        id: profile.id,
      });

      if (isFacebook)
        newUser.avatar = `https://graph.facebook.com/${profile.id}/picture`;

      if (isTwitter) newUser.avatar = profile._json.profile_image_url_https;

      if (isGoogle) newUser.avatar = profile.photos[0].value;

      if (isGithub) newUser.avatar = profile._json.avatar_url;

      newUser.save(err => {
        if (err) {
          throw err;
        }

        return done(null, newUser);
      });
    } else {
      return done(err, user);
    }
  });
}
