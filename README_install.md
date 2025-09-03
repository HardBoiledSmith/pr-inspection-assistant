# Guide: Installing and Uploading a Custom Task with TFX

## 1. Install TFX (Cross Platform CLI)

If you don’t have **TFX CLI** installed yet, install it globally via npm:

```bash
$ npm install -g tfx-cli
```

Check the installation:

```bash
$ tfx --version
```

---

## 2. Login to Azure DevOps Organization

Use a **Personal Access Token (PAT)** to authenticate.
⚠️ Replace `<YOUR_PAT_TOKEN>` with your actual PAT token (do not share it publicly).

```bash
$ tfx login --service-url "https://dev.azure.com/<your-org>" --auth-type pat --token "<YOUR_PAT_TOKEN>"
```

If the login is successful, you should see:

```
TFS Cross Platform Command Line Interface v0.21.3
Copyright Microsoft Corporation
Logged in successfully
```

---

## 3. Unzip the Task Package

Unzip the provided task package (example: `pr-inspection-assistant.zip`):

```bash
$ unzip pr-inspection-assistant.zip
```

This will create a folder structure such as:

```
pr-inspection-assistant/
  └── pr-inspection-assistant/
      └── src/
          └── task.json
```

---

## 4. Navigate to the Task Folder

Move into the folder where the `task.json` file is located:

```bash
$ cd pr-inspection-assistant/pr-inspection-assistant/src
```

---

## 5. Upload the Task to Azure DevOps

Run the following command inside the folder containing `task.json`:

```bash
$ tfx build tasks upload --task-path .
```

Expected output:

```
TFS Cross Platform Command Line Interface v0.21.3
Copyright Microsoft Corporation
Collection URL: https://dev.azure.com/<your-org>

Task at .../pr-inspection-assistant/pr-inspection-assistant/src uploaded successfully!
```

---

✅ At this point, the custom task is uploaded and can be used in your Azure DevOps pipelines.

---