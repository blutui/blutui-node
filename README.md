<p align="left">
    <a href="https://blutui.com">
        <img src="https://cdn.blutui.com/assets/favicon/android-chrome-192x192.png" height="42" width="42" alt="Blutui">
    </a>
</p>

`blutui/blutui-node` is the Node.js library for the Blutui API from application written in server-side Javascript.

---

## Installation

Install the package with:

```bash
npm install blutui
```

## Configuration

To use the library you must provide an access token, located in the Blutui [Agency Console](https://console.blutui.com), as an environment variable `BLUTUI_ACCESS_TOKEN`:

```sh
BLUTUI_ACCESS_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
```

Or, you can set it on your own:

```ts
import Blutui from 'blutui'

const blutui = new Blutui('eyJhbGciOiJIUzI1NiIsInR5...')
```

## Usage

```ts
const blutui = new Blutui()

blutui.user.get()
blutui.user.email()
```
