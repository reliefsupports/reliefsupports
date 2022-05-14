# ReliefSupports Platform

This is a community-driven Open Source project to support relief support activities conducted by volunteers. This project was originally created to support flood relief activities in Sri Lanka in May 2017. We are revamping the entire platform at the moment to mainly focus on supporting the economic and humanitarian crisis we are about to face in Sri Lanka.

We welcome your innovative ideas, codeing and non-coding contributions and suggestions to build a better platform.

## How to Contribute

### Setting up the development environment

#### Prerequisites

- Install `Node.js` and `MongoDB` on your workstation.
- We use `Yarn` as we use `yarn-workspaces`

#### Clone the main repository

```bash
git clone git@github.com:reliefsupports/reliefsupports.git
cd reliefsupports
yarn // will install all the dependencies for all the apps at once
```

#### Run the application

```bash
yarn start // will start server and web at once
```

> Frontend on [::3000](http://localhost:3000) and Backend [::3001/api](http://localhost:3001/api)

#### Guidelines

- Primary branch is `master`, and strongly recommend to avoid pushing changes to `master` branch directly.
- Follow proper naming conventions always
- Alyways put active WIP PRs in draft stage

##### Branch names

- Use `feat/<awasome-feature>-[issue-id]` naming conventions for feature branches
- Use `fix/<good-fix>-[issue-id]` for bug fixes
- Use `chore/<task>-[issue-id]` for regular tasks

##### PR naming

- Use `feat: <My Awesome Feature>` naming conventions for feature titles
- Use `fix: <That fix>` for fixes
- Use `chore: <Regular Task>` for regular tasks

##### Commit messages

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

##### Issues

Apply labels appropriately for each issues when created:

- `epic`
- `story`
- `bug`
- `feature`
- `feature-request`
- `enhancement`
- `documentation`
- `question`
- `help wanted`

Components:

- `comp:frontend`
- `comp:server`

Labels for maintainers:

- `wontfix`
- `invalid`
- `good first issue`
- `duplicate`
- `freez`

Priorities:

- `priority:high`
- `priority:medium`
- `priority:low`

#### API Docs

Check [postman collection](/server/ReliefSupports-API.postman_collection.json)

## License

MIT
