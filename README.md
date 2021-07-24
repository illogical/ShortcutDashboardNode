![Shortcut Dashaboard](https://raw.githubusercontent.com/illogical/ShortcutDashboardNode/master/screenshots/2020-08-02-ShortcutDashboard.png)

# Project Overview

### Eventually I hope this can be:

- A customizable dashboard of buttons
  - ...for any touch screen [that supports Chrome] & any screen resolution
  - ...that can execute keyboard shortcuts on another Windows PC

## This could be all of that... **with some work**.

This project was first developed for a 4K touch screen laptop to send commands to a separate Windows PC running Blender 2.8x.

## Original Project Goals:

- Group buttons by task
- Ability to quickly swap button layouts/configurations
- An edit mode that primarily supports touch, but also mouse
- Importing/exporting button layout configurations

Currently the button layout is configurable, but via a json file.<br />
**A GUI would be way more fun for us all.**

## Features

- Custom web GUI with some great button animations
  - Configurable button layout via json file
  - Button groups
- Per-Application button layouts
  - Blender 2.8x
  - Windows

### Coming Next

- Importing/exporting button layout configurations
- An edit mode to easily modify button commands, text, icon, and placement.

### Desired Features

#### [if I had more than just 1 user of this application]

- Robust layout that supports smaller screen resolutions than just my laptop (would target iPads & phones next)
- Tags and filters
- More robust edit mode for mouse (drag and drop)
- More sample button configurations
- More robust means of executing python code in Blender
- Blender 3.0 support (if shortcuts change)

# Usage

The client and server can both be served via **http://localhost:3001** by executing:

```
npm run build
npm run sendkeys
```

> # Server / Client
>
> #### Running this project, only on the machine that receives commands, will conveniently:
>
> - Establish a server that receives shortcut key commands and executes them
>   - Nodejs Express web applcation that provides endpoints for receiving keyboard shortcuts, python commands, and a few Windows shortcuts such as volume controls.
> - A web page that can be accessed by any other device on your home network
>   - React.js web application that provides a dashboard of buttons that send commands to the Express web api.

## Available Scripts

In the project directory, you can run:

### npm run sendkeys

Runs the backend ExpressJS web service on **port 3001**

SendKeys API example:

```
GET /send/keys/a?modifiers=asc
```

> a=alt
> s=shift
> c=ctrl

Application settings:

```
GET /settings
```

### npm start

Use this for development hot module reloading.

Runs the React app in the development mode on port 3000.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### npm run build

Builds the React app to the `build` folder.<br />

# For Blender Python Support

1. Using the Pie Menu Editor add-on, create a Macro Operator
   - Edit it to open a .py file
   - Assign it a shortcut key combo
2. Update /server/serverSettings.json with the path to that .py file and the shortcut combo
