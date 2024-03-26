import React, { useEffect } from "react";

const FacebookShareButton = () => {
  useEffect(() => {
    try {
      window.fbAsyncInit = function () {
        window.FB.init({
          xfbml: true,
          version: "v19.0",
        });
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    } catch (error) {
      console.error("Error loading Facebook SDK:", error);
    }
  }, []);

  return (
    <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="" data-size="">
      <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">
        Share
      </a>
    </div>
  );
};

export default FacebookShareButton;
