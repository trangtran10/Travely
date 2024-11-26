




async function allPosts() {
    let postsDiv = document.getElementById("posts_box").innerText;
    let postsJson = await fetchJSON(`api/apiv3/posts`)
    



    // destination: { type: String, required: true } ,
    // photo: { type: String, required: true}
    let postsHtml = postsJson.map(postInfo => {
        return `
        <div class="post">
            <div class="col-sm">
              <div class="card-2" style="width: 18rem">
                <a href="" clas="stretched-link">
                <img
                  class="card-img-top"
                  src="img/${photo}"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title-2">${postInfo.destination}</h5>
                  <p class="card-text-2">by ${postInfo.username}</p>
                  <!-- <button class="heart_button" onclick="">&#x2665;</button> -->
                </a>
                  <button class="heart_button" onclick="">&#x2661;</button>
                </div>
              </div>
              </div>
        </div>`
    }).join("\n");



    postsDiv.innerHTML = postsHtml;

}