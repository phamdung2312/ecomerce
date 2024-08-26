import React from "react";

export default function CommentComponent({ dataHref, width }) {
  return (
    <div style={{ marginTop: "10px", textAlign: "left" }}>
      <div
        class="fb-comments"
        data-href={dataHref}
        data-width={width}
        data-numposts="5"></div>
    </div>
  );
}
