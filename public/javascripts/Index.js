




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
                <a href="${postInfo.destination}${postInfo.username}.html" class="stretched-link">
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



async function addPost(){
    document.getElementById("postStatus").innerHTML = "sending data..."
    let destination = document.getElementById("InputDestination").value;
    let airline = document.getElementById("InputAirline").value;
    let hotel = document.getElementById("InputHotel").value;
    let summary = document.getElementById("InputSummary").value;

    
    try{
        await fetchJSON(`api/v1/itineraries`, {
            method: "POST",
            body: {destination: destination, airline: airline, hotel: hotel, summary: summary}
        })
    }catch(error){
        document.getElementById("postStatus").innerText = "Error"
        throw(error)
    }
    document.getElementById("InputDestination").value = "";
    document.getElementById("InputAirline").value = "";
    document.getElementById("InputHotel").value = "";
    document.getElementById("InputSummary").value = "";
    allPosts();
    
}