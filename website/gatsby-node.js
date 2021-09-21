const path = require("path");

const createClassificationPages = (createPage, posts) => {
  const classifications = [
    {
      singularName: "category",
      pluralName: "categories",
      template: {
        part: path.resolve(`src/templates/Category.tsx`),
        all: path.resolve(`src/templates/AllCategory.tsx`),
      },
      postsByClassificationNames: getPostsByType(posts, "categories"),
    },
    {
      singularName: "tag",
      pluralName: "tags",
      template: {
        part: path.resolve(`src/templates/Tag.tsx`),
        all: path.resolve(`src/templates/AllTag.tsx`),
      },
      postsByClassificationNames: getPostsByType(posts, "tags"),
    },
  ];

  classifications.forEach((classification) => {
    const names = Object.keys(classification.postsByClassificationNames);

    createPage({
      path: `/${classification.pluralName}`,
      component: classification.template.all,
      context: {
        [`${classification.pluralName}`]: names.sort(),
      },
    });

    names.forEach((name) => {
      const postsByName = classification.postsByClassificationNames[name];
      createPage({
        path: `/${classification.pluralName}/${name}`,
        component: classification.template.part,
        context: {
          posts: postsByName,
          [`${classification.singularName}Name`]: name,
        },
      });
    });
  });
};

const getPostsByType = (posts, classificationType) => {
  const postsByType = {};
  posts.forEach(({ node }) => {
    if (node.frontmatter[classificationType]) {
      node.frontmatter[classificationType].forEach((name) => {
        if (!postsByType[name]) {
          postsByType[name] = [];
        }
        postsByType[name].push(node);
      });
    }
  });
  return postsByType;
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const {
    data: {
      allSanityPost: { nodes: posts },
    },
  } = await graphql(`
    query {
      allSanityPost {
        nodes {
          id
          slug {
            current
          }
        }
      }
    }
  `);

  const postTemplate = path.resolve(`src/templates/Post/index.tsx`);

  for (const post of posts) {
    if (post.slug?.current)
      createPage({
        path: post.slug.current,
        component: postTemplate,
        context: {
          id: post.id,
        },
      });
  }
};
