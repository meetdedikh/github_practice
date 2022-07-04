import {
  getFocusStyle,
  getTheme,
  mergeStyleSets,
  Stack,
} from "@fluentui/react";
import { FocusZone, FocusZoneDirection } from "@fluentui/react/lib/FocusZone";
import { List } from "@fluentui/react/lib/List";
import { useEffect, useState } from "react";
import { Comment } from "./Comment";
import { Likes } from "./Likes";
import _ from "lodash";
import { DeletePost } from "./DeletePost";
const theme = getTheme();
const { palette, semanticColors, fonts } = theme;

const classNames = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: "border-box",
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: "flex",
      selectors: {
        "&:hover": { background: palette.neutralLight },
      },
    },
  ],

  itemContent: {
    marginLeft: 10,
    overflow: "hidden",
    flexGrow: 1,
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10,
  },
});

const onRenderCell = (item, index, userId, fullname) => {
  let unlike;
  _.find(item.like, (likedata) => {
    if (likedata.userId == userId) {
      unlike = likedata.id;
    }
  });

  return (
    <div className={classNames.itemCell} data-is-focusable={true}>
      <div className={classNames.itemContent}>
        <div className={classNames.itemName}>{item.title}</div>
        <div className={classNames.itemIndex}>{item.user.fullname}</div>
        <div>{item.description}</div>
        <Stack style={{ flexDirection: "row", alignItems: "center" }}>
          <Likes
            likes={item.like}
            postId={item.id}
            userId={userId}
            liked={unlike}
          />
          <Comment
            comments={item.comment}
            postId={item.id}
            userId={userId}
            fullname={fullname}
          />
          <DeletePost postId={item.id} Item={item} userId={userId} />
        </Stack>
      </div>
    </div>
  );
};

const PostSection = () => {
  const [posts, setPosts] = useState([]);
  let userId = localStorage.getItem("userId");
  let fullname = localStorage.getItem("fullname");

  const getData = () => {
    let token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/posts", requestOptions)
      .then((response) => {
        response.text().then((result) => {
          let data = JSON.parse(result);
          setPosts(data);
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <List
        items={posts}
        onRenderCell={(item, index) =>
          onRenderCell(item, index, userId, fullname)
        }
      />
    </FocusZone>
  );
};
export default PostSection;
