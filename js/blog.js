let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

const titleInput = document.getElementById("post-title");
const contentInput = document.getElementById("post-content");
const savePostBtn = document.getElementById("save-post-btn");
const postsContainer = document.getElementById("posts-container");
const editIndexInput = document.getElementById("edit-index");

function savePosts() {
  localStorage.setItem("blogPosts", JSON.stringify(posts));
}

function renderPosts() {
  postsContainer.innerHTML = "";

  posts.slice().reverse().forEach((post, index) => {
    const realIndex = posts.length - 1 - index;
    const card = document.createElement("div");
    card.className = "col-md-6";

    card.innerHTML = `
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.content.slice(0, 100)}...</p>
          <button class="btn btn-sm btn-outline-info me-2" onclick="viewPost(${realIndex})">View</button>
          <button class="btn btn-sm btn-outline-warning me-2" onclick="editPost(${realIndex})">Edit</button>
          <button class="btn btn-sm btn-outline-danger" onclick="deletePost(${realIndex})">Delete</button>
        </div>
      </div>
    `;
    postsContainer.appendChild(card);
  });
}

function addOrUpdatePost() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const editIndex = editIndexInput.value;

  if (title && content) {
    if (editIndex !== "") {
      posts[editIndex] = { title, content };
    } else {
      posts.push({ title, content });
    }
    savePosts();
    clearForm();
    renderPosts();
  }
}

function editPost(index) {
  const post = posts[index];
  titleInput.value = post.title;
  contentInput.value = post.content;
  editIndexInput.value = index;
  savePostBtn.textContent = "Update Post";
}

function deletePost(index) {
  posts.splice(index, 1);
  savePosts();
  renderPosts();
}

function clearForm() {
  titleInput.value = "";
  contentInput.value = "";
  editIndexInput.value = "";
  savePostBtn.textContent = "Publish Post";
}

function viewPost(index) {
  const post = posts[index];
  alert(`Title: ${post.title}\\n\\n${post.content}`);
}

savePostBtn.addEventListener("click", addOrUpdatePost);

renderPosts();
