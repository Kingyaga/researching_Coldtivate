# Guidelines

## Code of Conduct

We are committed to fostering an open, welcoming, and harassment-free community. By participating, you agree to:

- Use respectful, inclusive, and professional language.
- Embrace constructive feedback and collaborate effectively.
- Avoid harassment, hate speech, personal attacks, or any form of inappropriate behavior.
- Respect privacy by not sharing personal or confidential information without consent.

Project maintainers will enforce these guidelines and take appropriate actions when necessary. Reports of misconduct can be submitted confidentially.

## Getting Started

To contribute, we use Issues and Pull Requests (PRs). Before submitting, please follow these steps:

- **Search for existing Issues and PRs** to avoid duplication.
- **Use Issues** for bug reports, feature requests, or discussions.
- Follow the provided templates for Issues and PRs to ensure clarity.

## I Have a Question

Before asking a question, check the existing [Issues](https://gitlab.com/b1866/coldtivate/mobile-app-react-native/-/issues){:target="_blank"}. If you find a relevant issue but need further clarification, feel free to comment within that issue.

If you still need help, follow these steps:

- Open a new [Issue](https://gitlab.com/b1866/coldtivate-mobile-app-react-native/issues/new){:target="_blank"}.
- Provide as much context as possible about the problem.
- Include any relevant information (logs, error messages, environment details, etc).

We’ll get back to you as soon as possible.

## I Want To Contribute

By contributing, you agree that:

- You have authored 100% of the content you submit.
- You hold the necessary rights to the content.
- Your contributions will be licensed under the project's license.

### Before Submitting a Bug Report

A good bug report helps us resolve issues more efficiently. Before submitting, please investigate thoroughly and provide detailed information to avoid back-and-forth requests for clarification.

#### How to Submit a Good Bug Report

For security-related issues, vulnerabilities, or bugs containing sensitive information, please consult our [Security Policy](/contributing/security-disclosure/){:target="_blank"} rather than posting publicly.

When submitting a bug, follow these steps:

1. **Open an [Issue](https://gitlab.com/b1866/coldtivate-mobile-app-react-native/issues/new){:target="_blank"}**: Create an Issue.
    - Avoid labeling it as a bug initially.
2. **Describe the Issue**: Include both the expected behavior and the actual behavior you encountered.
3. **Provide Reproduction Steps**: Include clear steps someone else can follow to reproduce the issue. For a robust report, isolate the problem and create a minimal test case.
4. **Include Context**: Provide additional information, such as environment details, versions, or logs.

Once submitted:

- The team will label the issue accordingly.
- A maintainer will attempt to reproduce the issue. If the steps aren’t clear, the issue will be tagged with `needs-repro` and resolved once it can be reproduced.
- If the issue is reproducible, it will be tagged with `needs-fix` and prioritized for resolution.

### Your First Contribution

Follow these steps to make your first contribution, whether it’s code or documentation.

#### Step 1: Fork the Repository
Fork the repository to create a personal copy in your GitLab account.

#### Step 2: Clone the Repository
Clone the forked repository by running the following command:

```bash
git clone your-forked-repo-url
```

Replace `your-forked-repo-url` with your actual fork URL.

#### Step 3: Create a Branch
Navigate to your project directory and create a new branch:

```bash
cd project-directory
git checkout -b your-branch-name
```

Use a descriptive branch name, like `fix-login-bug` or `update-docs`.

#### Step 4: Make Changes and Commit
Make your changes:

- **Code**: Implement the desired feature or fix, following our coding guidelines.
- **Documentation**: Edit markdown files to improve clarity and accuracy.

Then, stage and commit your changes:

```bash
git add .
git commit -m "A clear description of your changes"
```

Commit messages should summarize the changes made.

#### Step 5: Push Your Changes
Push your changes to your forked repository:

```bash
git push -u origin your-branch-name
```

#### Step 6: Submit a Merge Request
Go to your GitLab fork, navigate to `Merge Requests`, and click `New Merge Request`. Select your branch and submit the request.

When submitting, ensure that:

- The title and description are clear.
- Any related issues are referenced.
- The steps to test your changes are included.
- You attach screenshots or demos if your changes impact the UI.

Once your changes are reviewed and merged, you’ll receive a notification. Congrats on your first contribution!

## Styleguides

### Frontend

To ensure code quality and consistency, we use [Husky](https://github.com/typicode/husky){:target="_blank"} to enforce linting and type safety before code commits. Husky automatically runs:

- [ESLint](https://github.com/eslint/eslint){:target="_blank"} for linting.
- [Prettier](https://github.com/prettier/prettier){:target="_blank"} for formatting.

You can manually run these checks before committing:

```bash
# run ESLint
yarn lint:fix

# run Prettier
yarn format

# run TypeScript type checking
yarn lint:ts
```

### Backend

For backend development, we follow the [Django coding style](https://docs.djangoproject.com/en/dev/internals/contributing/writing-code/coding-style/){:target="_blank"}.

## Getting Help

If you need help, open an Issue or join the community discussions. Your contributions are invaluable to Coldtivate, and we appreciate your support!
