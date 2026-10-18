// task 2: use promise.all to catch multiple promises returned by two asynchronous operations 
// and then reject or accept the main promise based on if details are valid or not


// two asynchronous operations

async function fetchUser(id) {

    let res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!res.ok) return null;

    return await res.json();

}



async function fetchPosts(id) {

    let res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);

    if (!res.ok) return null;

    return await res.json();

}



// main promise using promise.all to accept or reject

function checkDetails(id) {

    let mainPromise = new Promise((resolve, reject) => {

        Promise.all([fetchUser(id), fetchPosts(id)])

            .then(([user, posts]) => {

                // checking if details fetched by both async functions are valid
                if (user && user.id && Array.isArray(posts) && posts.length > 0) {

                    resolve({ user: user.name, postsCount: posts.length });

                } else {

                    reject("Details fetched are not valid");

                }

            })

            .catch((err) => {

                reject(err);

            });

    });

    return mainPromise;

}



// testing accept and reject

checkDetails(1)

    .then((res) => console.log("Accepted:", res))

    .catch((err) => console.log("Rejected:", err));



checkDetails(9999)

    .then((res) => console.log("Accepted:", res))

    .catch((err) => console.log("Rejected:", err));
