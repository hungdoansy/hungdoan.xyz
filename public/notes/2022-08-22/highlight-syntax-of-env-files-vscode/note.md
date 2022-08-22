# Highlight syntax of .env files in VSCode

A typical project often comes with different .env files for different environments. At Kyber, we name them `.env` for the local, `.env.dev` for the development, `.env.stg` and `.env.prod`. The suffices confuse VSCode. In a default setup, only syntax of `.env` is highlighted, the other files is displayed with a mere gray color.

This setting helped me to let VSCode also take the other `.env` files into account.

```json
{
    "files.associations": {
        ".env.*": "properties"
    }
}
```
