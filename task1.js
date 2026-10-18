// task 1: async await function that returns a valid user object on successful fetching from an api and returns an error on unsuccessful fetching


async function fetchUser(userId) {

    try {

        let res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        if (!res.ok) {

            throw new Error(`Failed to fetch user, HTTP status: ${res.status}`);

        }

        let user = await res.json();

        return user;

    } catch (err) {

        return new Error(err.message);

    }

}



// testing with valid and invalid id

async function run() {

    let validUser = await fetchUser(1);

    console.log(validUser);

    console.log("");

    let invalidUser = await fetchUser(9999);

    console.log(invalidUser);

}


run();
