export default function Post({ posts }) {
  return (
    <>
      <div>
        {posts.map((post) => (
          <div
            tabIndex={0}
            className="collapse collapse-open border-base-300 bg-base-200 border"
          >
            <div className="collapse-title text-xl font-medium">
              {post.title}
            </div>
            <div className="collapse-content">
              <p>{post.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
