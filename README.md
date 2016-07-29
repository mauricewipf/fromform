# fromform

A nodeJS server that receives `<form>` POSTs and sends you an email with the submitted message.

## Docs

- Don't change input names!
- Input `userEmail` Set your email address as value, required
- Input `submitterEmail` Required
- `message` Required

## Set up own nodeJS server

1. Fork this repository.
2. Sign up at [Sendgrid](https://sendgrid.com) and get an API Key.
3. Create a file called '.env' in the root folder with the following input (where `VALUE` is your API key):
```
SENDGRID_API_KEY=VALUE
```
4. Change link of the form action (`action="yourdomain.com/email"`).
5. Start server: `$ node server`

## License

`fromform`is licensed under the [MIT License](https://opensource.org/licenses/MIT).
