# Create a Branch

1.  Request access to this repo

1.  Pull the latest master
    - On the `master` branch: `git pull`

1.  Create a new branch
    `git checkout -b new-unique-branch-name`

1.  Stage your changes
    `git add .` to add all changed files or `git add path-to-file-to-stage` to add specific files
    
1. Commit your changes
    `git commit -m 'Message that details what commit entails'`

Ideally, your commits will be small, have similar or related changes in each commit, and your commit message will be detailed
enough that the reviewer knows what specific change was made in each commit.

## Prettier

[Why Prettier?](https://prettier.io/docs/en/why-prettier.html)
We are using Prettier in order to have a consistent code style and formatting and also to avoid the need to have discussions
about styling in PRs, as this is generally not a useful way to spend time. I would encourage you to read the above documentation,
as they go more into detail on why using Prettier is so beneficial.

Note: When you commit, Prettier will run automatically on all files that you're committing. Prettier _will_ make the
necessary formatting changes. If you would like to run Prettier outside of the commit step, you can run `yarn precommit`
and Prettier will run on all staged files.

# Create a Pull Request

Once you have finished adding commits to your branch, you can push it to the origin branch in GitHub. It is actually
highly encouraged to do this sooner, rather than later, as it is then stored on GitHub and not just your local
computer.
`git push origin branch-name`

## Creating the PR

1.  In GitHub, go to the main repo page.
1.  You should see a new banner with the option to create a Pull Request from the
    branch you just pushed to GitHub.
1.  Click the button
1.  On the next screen, give the PR a good, descriptive title
1.  In the Description section, give a detailed description of the change you introduced with this PR. In most cases,
    it is also a good idea to give the _why_ so that reviewers have the full picture of the change you are making.
1.  In the Test Plan section, list the manual steps to test that your change is working. Again, being detailed here is
    valuable for two reasons:
    - It forces you to actually go through the testing steps and verify yourself that the change is working
    - It helps the reviewer to test that your change is working without them needing to figure it out on their own
1.  Click on the "Files changed" tab and review your changes _line by line_. Verify that every line of code changed is intended and that nothing accidently got committed.
1.  Add the "needs review" label to indicate that the PR needs to be reviewed

## GitHub Labels

There are several labels in GitHub for use on PRs. Here is their meaning and when to use them:

`work in progress` - use while you are still working on a PR

`needs review` - use once your PR is ready for review

`needs revision` - used by the code reviewer to indicate the PR needs changes before being approved

`needs discussion` - used by the code reviewer to indicate the PR needs discussion or questions answered before being approved
