export async function checkGithubRepo(url: string): Promise<any | undefined> {
    if(url === ""){
      return
    }

    try {
      const repoOwnerName = url.split('/').slice(-2)[0];
      const repoName = url.split('/').slice(-1)[0];
      const response = await fetch(`https://api.github.com/repos/${repoOwnerName}/${repoName}`,{
        headers:{
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        }
      });
      
      if (!response.ok) {
        throw new Error(`Invalid github repo`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`${error}`)
    }
  }