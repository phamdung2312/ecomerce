import React from "react";

export default function LikeButtonComponent({ dataHref }) {
  return (
    <div style={{ marginTop: "10px", textAlign: "left" }}>
      <div
        class="fb-like"
        data-href={dataHref}
        data-width=""
        data-layout=""
        data-action=""
        data-size=""
        data-share="true"></div>
    </div>
  );
}
