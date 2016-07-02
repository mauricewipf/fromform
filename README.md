# fromform

A nodeJS server that receives `<form>` POSTs and sends you an email with the submitted message.

## Docs

- Don't change input names!
- Input `userEmail` Set your email address as value, required
- Input `submitterEmail` Required
- `message` Required

## Set up own nodeJS server

1. Fork this repository.
2. Sign up at [Sengrid](https://sendgrid.com) and get an API Key.
3. Create a file called 'sendgrid-api.js' in the root folder with the following input:
```
exports.key = "YOUR_SENDGRID_API_KEY";
```
4. Change link of the form action (`action="yourdomain.com/send-form"`).

## License

`fromform`is licensed under the [MIT License](https://opensource.org/licenses/MIT).
