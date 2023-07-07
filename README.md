<p align="center">
  <img alt="Lighthouse reporter" src="./Logo.png" width="500"/>
</p>

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
    "pages": ["https://vczb.github.io/", "https://vczb.github.io/about"],
    "callbackUrl": "https://my-site.com/optional/callback"
  }
  ```
- Reponse:
  ```json
  {
    "message": "Trigger was create successfully!",
    "trigger": {
      "user": "63101417561a7dcc826ff500",
      "name": "site",
      "pages": ["https://vczb.github.io/", "https://vczb.github.io/about"],
      "callbackUrl": "https://my-site.com/optional/callback"
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
        "pages": ["https://github.com/vczb"],
        "callbackUrl": "https://my-site.com/optional/callback"
      },
      {
        "user": "63101417561a7dcc826ff500",
        "name": "site",
        "pages": ["https://vczb.github.io/", "https://vczb.github.io/about"],
        "callbackUrl": "https://my-site.com/optional/callback"
      }
    ]
  }
  ```

**Delete trigger**

- Method: `POST`
- URL: `/api/trigger/delete`
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
    "message": "Trigger was deleted successfully"
  }
  ```

**Edit trigger**

- Method: `POST`
- URL: `/api/trigger/edit/name`
- Header:
  - `Content-Type: application/json`
  - `x-access-token: XxxXXXXXxx`
- Body:
  ```json
  {
    "name": "site-updated",
    "pages": ["https://vczb.github.io/", "https://vczb.github.io/about"],
    "callbackUrl": "https://my-site.com/optional/callback"
  }
  ```
- Reponse:
  ```json
  {
    "message": "Trigger was edited successfully!",
    "trigger": {
      "user": "63101417561a7dcc826ff500",
      "name": "site-updated",
      "pages": ["https://vczb.github.io/", "https://vczb.github.io/about"],
      "callbackUrl": "https://my-site.com/optional/callback"
    }
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

  **Delete user**

- Method: `POST`
- URL: `/api/user/delete`
- Header:
  - `Content-Type: application/json`
  - `x-access-token: XxxXXXXXxx`
- Body:
  ```json
  {}
  ```
- Reponse:
  ```json
  {
    "ok": true,
    "message": "User was deleted successfully"
  }
  ```

**Edit user**

- Method: `POST`
- URL: `/api/user/edit`
- Header:
  - `Content-Type: application/json`
  - `x-access-token: XxxXXXXXxx`
- Body:
  ```json
  {
    "email": "email@test.com",
    "password": "123456",
  }
  ```
- Reponse:
  ```json
  {
    "ok": true,
    "message": "User was edited successfully!",
  }
  ```

## Contributing

You can contribute to this project by opening an issue or creating a pull request.

Check the best practices on the [CONTRIBUTING](./CONTRIBUTING.md) file.

## License

This project is licensed under the [MIT](./LICENSE) License.
