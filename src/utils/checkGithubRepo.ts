export async function checkGithubRepo(url: string): Promise<any | undefined> {
  if (!url) return undefined;

  try {
    const [repoOwnerName, repoName] = url.split("/").slice(-2);
    const response = await fetch(
      `https://api.github.com/repos/${repoOwnerName}/${repoName}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (!response.ok) {
      console.warn(`Invalid GitHub repo: ${response.statusText}`);
      return undefined;
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking GitHub repo:", error);
    return undefined;
  }
}
