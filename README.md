# PhaserBeams (Next)

This is an experiment in combining various technologies together in the effort to make a simple novel online multiplayer game. The various components of the project are as follows:

- [Next.js](https://nextjs.org/) web application
  - Multi-user frontend user interface
  - Modern React based framework
  - Easily hostable at [Vercel](https://vercel.com/)
- [Supabase](https://supabase.com/) PaaS
  - Authorisation (GitHub)
  - Database
  - Realtime event subscriptions
- [WLED](https://kno.wled.ge/) LED Controller
  - Separate controller service
  - Polls Supabase subscriptions
  - Updates LED strips using WLED [realtime UDP protocol](https://kno.wled.ge/interfaces/udp-realtime/)

## Game Concepts

The games must be extremely simple as they must be rendered on a 1-dimensional LED strip.

Initial work will be implementing the required multiplayer environment and realtime subscription updates to the LED strip.

## Examples / Screenshots

Prototype web interface

![Prototype web interface](./docs/images/page-main.png)

WLED realtime subscriber service

![WLED realtime subscriber service](./docs/images/wled-console.png)

## Usage

The experiment is currently deployed at: [https://phaserbeams-next.vercel.app/](https://phaserbeams-next.vercel.app/)

Click _Login with GitHub_ and login using your GitHub identity.

## Development

To develop and run the Next.js development server:

    npm install
    npm run dev

To start the LED controller service:

    node wled.js
