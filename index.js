const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your GitHub username: ', async (userName) => {
    async function getGithubData(params) {
        const response = await fetch(`https://api.github.com/users/${params}/events`);
        const data = await response.json();
        return data;
    }

    const data = await getGithubData(userName);
    const commitsMessage = data .map((res) => res.payload.commits).filter(Boolean).flat().map((commit) => commit.message); 
    commitsMessage.forEach((message)=>{
        console.log(message);
    })
    rl.close();
});