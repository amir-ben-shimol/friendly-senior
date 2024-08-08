# FriendlySenior

### Your Friendly Senior Developer Bot for Pull Request Reviews

Welcome to **FriendlySenior**, the GitHub app designed to bring a touch of friendliness and expertise to your pull request reviews. With FriendlySenior, you can ensure that your code is reviewed with a smile, providing valuable insights and comments to enhance the quality of your projects.

## Features

-   **Automated Code Reviews**: FriendlySenior leverages advanced AI to analyze and review your code, simulating the expertise of a friendly senior developer.
-   **In-Depth Comments**: Receive detailed and constructive feedback on your pull requests, helping you to identify potential issues and areas for improvement.
-   **Real-Time Processing**: FriendlySenior works seamlessly in the background, providing updates and comments in real-time as you make changes to your pull requests.
-   **Customizable Configurations**: Tailor the review criteria and rules to match your project's specific needs, ensuring that the feedback is relevant and valuable.
-   **Efficient Workflow Integration**: Easily integrates with your existing GitHub workflow, ensuring a smooth and efficient review process.

## How It Works

1. **Install FriendlySenior**: Add FriendlySenior to your GitHub repository.
2. **Configure FriendlySenior**: Create a configuration file under the `.github` folder named `friendly-senior.yml` or `friendly-senior.yaml` with your desired settings.
3. **Open a Pull Request**: When you open a new pull request, FriendlySenior gets to work, analyzing the changes and providing feedback.
4. **Receive Feedback**: FriendlySenior will add comments directly to your pull request, offering insights and suggestions for improvement.
5. **Update Your Code**: Review the feedback and make necessary adjustments to your code.
6. **Complete the Review**: Once all comments are addressed, finalize your pull request with confidence, knowing that it has been thoroughly reviewed.

## Configuration

To get started, create a file under the `.github` folder named `friendly-senior.yml` or `friendly-senior.yaml` and add the following configurations:

```yaml
/**
* The target branch for pull requests.
* This is the branch against which the pull requests will be reviewed.
*/
targetBranch: string;

/**
* Array of keywords for relevant project technologies.
* These keywords help to identify the technologies used in the project,
* enabling the review process to be more context-aware.
*/
techKeywords: string[];

/**
* Minimum number of lines changed in a pull request to trigger a review.
* If the number of lines changed in a pull request is below this threshold,
* the review process will not be triggered.
*/
minLinesChanged: number;

/**
* Maximum number of lines changed in a pull request to trigger a review.
* If the number of lines changed in a pull request exceeds this threshold,
* the review process will not be triggered.
*/
maxLinesChanged: number;

/**
* Array of file extensions to include in the review.
* Only files with these extensions will be considered for the review process.
*/
includeFileExtensions: string[];

/**
* Array of file extensions to exclude from the review.
* Files with these extensions will be ignored during the review process.
*/
excludeFileExtensions: string[];

/**
* Array of filenames to exclude from the review.
* Specific files that should be ignored during the review process.
*/
excludeFiles: string[];

/**
* Custom prompt to be used for the OpenAI API.
* This prompt can be tailored to customize the type of feedback provided by the OpenAI model.
*/
customPrompt?: string;

/**
* Whether to enable detailed explanations in the review comments.
* If true, the review comments will include detailed explanations and suggestions.
*/
enableDetailedExplanations: boolean;
```
