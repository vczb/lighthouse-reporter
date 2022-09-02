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
DB_URL=mongodb://lr_app:lr_app@localhost:27017/lr_db
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
      "pages": ["https://vczb.github.io/", "https://vczb.github.io/about"],
      "_id": "631148f641a03f4a480263b0",
      "__v": 0
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
        "_id": "631017c73b928313f888e557",
        "user": "63101417561a7dcc826ff500",
        "name": "github",
        "pages": ["https://github.com/vczb"],
        "__v": 0
      },
      {
        "_id": "631142fb90071b61f7cf50c9",
        "user": "63101417561a7dcc826ff500",
        "name": "site",
        "pages": ["https://vczb.github.io/", "https://vczb.github.io/about"],
        "__v": 0
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
    "trigger": [
      {
        "_id": "631017c73b928313f888e557",
        "user": "63101417561a7dcc826ff500",
        "name": "github",
        "pages": ["https://github.com/vczb"],
        "__v": 0
      },
      {
        "_id": "631142fb90071b61f7cf50c9",
        "user": "63101417561a7dcc826ff500",
        "name": "site",
        "pages": ["https://vczb.github.io/", "https://vczb.github.io/about"],
        "__v": 0
      }
    ]
  }
  ```

## TODO:

- Add unit tests with jest
- Protect route attributes with celebrate
- Refactor esmodules imports
- Add support to webhook callback after trigger
