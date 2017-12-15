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
          type="text/javascript"
          src="//downloads.mailchimp.com/js/signup-forms/popup/embed.js"
          data-dojo-config="usePlainJson: true, isDebug: false"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `require(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us17.list-manage.com","uuid":"43ed406e5415ae6b83c977e4f","lid":"5bfa1e8b75"}) })`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/usylxaq5';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()`,
          }}
        />
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
            !function() {
              var t;
              if (t = window.driftt = window.drift = window.driftt || [], !t.init) return t.invoked ? void (window.console && console.error && console.error("Drift snippet included twice.")) : (t.invoked = !0, 
              t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
              t.factory = function(e) {
                return function() {
                  var n;
                  return n = Array.prototype.slice.call(arguments), n.unshift(e), t.push(n), t;
                };
              }, t.methods.forEach(function(e) {
                t[e] = t.factory(e);
              }), t.load = function(t) {
                var e, n, o, i;
                e = 3e5, i = Math.ceil(new Date() / e) * e, o = document.createElement("script"), 
                o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + i + "/" + t + ".js", 
                n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
              });
            }();
            drift.SNIPPET_VERSION = '0.3.1';
            drift.load('tbi5z98xrci3');
            `,
          }}
        /> */}
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
