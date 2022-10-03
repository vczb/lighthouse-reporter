# Lighthouse reporter

Generate lighthouse reports and save it in a mongo database.

---

## Get started

Install all dependencies

```bash
  yarn install
```

Add the `.env` variables

```bash
DB_URL=mongodb://<db_user>:<db_pass>@localhost:27017/<db_name>
DB_URL_DEV=mongodb://<db_user_dev>:<db_pass_dev>@localhost:27017/<db_name_dev>
SECRET_KEY=lr-secret-key
```

Run the project

```bash
  yarn dev
```

## API doc:

**Sign up**

- Method: `POST`
- URL: `/api/signup`
- Header: `Content-Type: application/json`
- Body:
  ```json
  {
    "email": "email@test.com",
    "password": "123456"
  }
  ```
- Reponse:
  ```json
  {
    "message": "User was registered successfully!",
    "user": {
      "id": "6311481641a03f4a480263ad",
      "email": "email@test.com"
    }
  }
  ```

**Sign in**

- Method: `POST`
- URL: `/api/signin`
- Header: `Content-Type: application/json`
- Body:
  ```json
  {
    "email": "email@test.com",
    "password": "123456"
  }
  ```
- Reponse:
  ```json
  {
    "email": "email@test.com",
    "accessToken": "xxYYYxxYYxyxYXyy"
  }
  ```

**Create trigger**

- Method: `POST`
- URL: `/api/trigger/create`
- Header:
  - `Content-Type: application/json`
  - `x-access-token: XxxXXXXXxx`
- Body:
  ```json
  {
    "name": "site",
    "pages": ["https://vczb.github.io/", "https://vczb.github.io/about"]
  }
  ```
- Reponse:
  ```json
  {
    "message": "Trigger was create successfully!",
    "trigger": {
      "user": "63101417561a7dcc826ff500",
      "name": "site",
      "pages": ["https://vczb.github.io/", "https://vczb.github.io/about"]
    }
  }
  ```

**Dispatch trigger**

- Method: `POST`
- URL: `/api/trigger/dispatch`
- Header:
  - `Content-Type: application/json`
  - `x-access-token: XxxXXXXXxx`
- Body:
  ```json
  {
    "name": "site"
  }
  ```
- Reponse:
  ```json
  {
    "ok": true,
    "message": "Trigger was dispatched successfully"
  }
  ```

**Show trigger**

- Method: `GET`
- URL: `/api/trigger/show`
- Header:
  - `Content-Type: application/json`
  - `x-access-token: XxxXXXXXxx`
- Reponse:
  ```json
  {
    "trigger": [
      {
        "user": "63101417561a7dcc826ff500",
        "name": "github",
        "pages": ["https://github.com/vczb"]
      },
      {
        "user": "63101417561a7dcc826ff500",
        "name": "site",
        "pages": ["https://vczb.github.io/", "https://vczb.github.io/about"]
      }
    ]
  }
  ```

**Show report**

- Method: `GET`
- URL: `/api/report/show?name=<TRIGGER-NAME>`
- Header:
  - `Content-Type: application/json`
  - `x-access-token: XxxXXXXXxx`
- Reponse:
  ```json
  {
    "report": [
      {
        "user": "63101417561a7dcc826ff500",
        "name": "site",
        "data": [
          {
            "url": "https://vczb.github.io/",
            "accessibility": "78",
            "best": "92",
            "performance": "97",
            "pwa": "30",
            "seo": "100",
            "_id": "631143d30b4556af51696e54"
          },
          {
            "url": "https://vczb.github.io/about",
            "accessibility": "67",
            "best": "92",
            "performance": "93",
            "pwa": "20",
            "seo": "100",
            "_id": "631143d30b4556af51696e55"
          }
        ],
        "createdAt": "2022-09-01T23:44:19.969Z",
        "updatedAt": "2022-09-01T23:44:19.969Z"
      }
    ]
  }
  ```

## Contributing

You can contribute to this project by opening an issue or creating a pull request.

### Step 1: Fork the project repository

Fork the repository to you GitHub

### Step 2: Clone your fork

While still in your repository, click on the code drop down menu. Now you can either download the zip file and extract it on your local system or copy the https url and use the command git clone <https url> to clone it to a local directory/folder. 
  
```bash
git clone <https url>
```


### Step 3: Navigate to your local repository

Since the clone was downloaded into a subdirectory of your working directory, you can navigate to it using: cd NAME_OF_REPOSITORY.

For example,

```bash
cd <name of repository>
```

### Step 4: Pull the latest changes from upstream into your local repository

Before you start making any changes to your local files, it's a good practice to first synchronize your local repository with the project repository. Use git pull upstream master to "pull" any changes from the "master" branch of the "upstream" into your local repository. (If the project repository uses "main" instead of "master" for its default branch, then you would use git pull upstream main instead.)
  
  ```bash
git pull upstream master
```

If you forked and cloned the project repository just a few minutes ago, it's very unlikely there will be any changes, in which case Git will report that your local repository is "already up to date". But if there are any changes, they will automatically be merged into your local repository.

### Step 5: Create a new branch

Rather than making changes to the project's "main" branch, it's a good practice to instead create your own branch. This creates an environment for your work that is isolated from the master branch.

Use git checkout -b BRANCH_NAME to create a new branch and then immediately switch to it. The name of the branch should briefly describe what you are working on, and should not contain any spaces.

For example,

```bash
git checkout -b <new branch name>
```

Use git branch to show your local branches. You should see your new branch as well as "main", and your new branch should have an asterisk next to it to indicate that it's "checked out" (meaning that you're working in it).
  
```bash
git branch
```

### Step 6: Make changes in your local repository

Use a text editor or IDE to make the changes you planned to the files in your local repository. Because you checked out a branch in the previous step, any edits you make will only affect that branch.

### Step 7: Git Add and Commit your changes

After you make a set of changes, use git add -A or git add . to stage your changes and `git commit -m "DESCRIPTION OF CHANGES"` to commit them.

  
 ```bash
git add .
git commit -m"<Description of changes>"
```

If you are making multiple sets of changes, it's a good practice to make a commit after each set.

### Step 8: Push your changes to your fork

When you are done making all of your changes, upload these changes to your fork using git push origin BRANCH_NAME. This "pushes" your changes to the "BRANCH_NAME" branch of the "origin" (which is your fork on GitHub).

For example: `git push origin <branch name>`
  
  ```bash
git push origin <BRANCH_NAME>
```

### Step 9: Begin the pull request

Return to your fork on GitHub, and refresh the page. You may see a highlighted area that displays your recently pushed branch:
  ![Screenshot from 2022-10-02 08-21-40](https://user-images.githubusercontent.com/110360901/193435745-29a63b49-0281-4028-b803-59a51d476c5f.png)

Click the green Compare & pull request button to begin the pull request.

### Step 10: Create the pull request

Before submitting the pull request, you first need to describe the changes you made (rather than asking the project maintainers to figure them out on their own). You should write a descriptive title for your pull request, and then include more details in the body of the pull request. If there are any related GitHub issues, make sure to mention those by number. The body can include Markdown formatting, and you can click the Preview tab to see how it will look.
  ![Screenshot from 2022-10-02 08-45-18](https://user-images.githubusercontent.com/110360901/193436340-e7c16416-fe18-4f72-959f-183c6ebf3b55.png)


On the right side, you may see a link to the project's Contributing guidelines. This is primarily worth reading through if you are submitting substantial code (rather than just fixing a typo), but it may still be worth scanning through at this point.

Below the pull request form, you will see a list of the commits you made in your branch, as well as the "diffs" for all of the files you changed.![imageedit_4_2018320298](https://user-images.githubusercontent.com/110360901/193436276-3b1dad3b-adcc-4e14-b1db-194573c85ee2.png)
![Screenshot from 2022-10-02 08-48-44](https://user-images.githubusercontent.com/110360901/193436410-e327ed38-ae16-4a4e-91d4-e3f5cd14bb73.png)

If everything looks good, click the green Create pull request button!

## License

This project is licensed under the [MIT](./LICENSE) License.
