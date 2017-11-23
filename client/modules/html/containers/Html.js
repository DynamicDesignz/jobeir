// @flow
/* eslint-disable react/no-danger */
import React from 'react';
import Helmet from 'react-helmet';
import serverConfig from '../../../../server/config/config';

const Html = (props: {
  css: {},
  assets: Array<string>,
  state: {},
  content: string,
}) => {
  const { css, assets, state, content } = props;
  const helmet = Helmet.rewind();
  const attrs = helmet.htmlAttributes.toComponent();

  return (
    <html {...attrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="WcmownCTmsIxRct3Zu1QIpIo0oaQAUzljYsOoObwE2c"
        />
        {helmet.link.toComponent()}
        <script type="text/javascript" src="https://js.stripe.com/v3/" />
        {Object.keys(assets.styles).length > 0 &&
          Object.keys(assets.styles)
            .reverse()
            .map(key => (
              <link
                rel="stylesheet"
                type="text/css"
                key={key}
                href={assets.styles[key]}
              />
            ))}
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/usylxaq5';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()`,
          }}
        />
      </head>
      <body>
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${serverConfig
            .google.MAPS_API_KEY}&libraries=places`}
        />
        <main
          id="app"
          dangerouslySetInnerHTML={{ __html: `<div>${content}</div>` }}
        />
        <script dangerouslySetInnerHTML={{ __html: state }} />
        {Object.keys(assets.javascript)
          .filter(key => key.includes('app') || key.includes('vendor'))
          .reverse()
          .map(key => <script key={key} src={assets.javascript[key]} />)}
      </body>
    </html>
  );
};

export default Html;
