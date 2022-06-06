import React from "react";

function PersonAvatar(props) {
  if (props.children.length > 0) {
    return (
      <div className="PersonAvatar">
        {props.children.map((item) => {
          return (
            <img
              key={item.original}
              className="PersonAvatarImg"
              onError={(event) => (event.target.style.display = "none")}
              src={item.original}
            />
          );
        })}
      </div>
    );
  }
}
export default PersonAvatar;
