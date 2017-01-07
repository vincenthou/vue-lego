#### A React Boilerplate Project Clone

## Introduction

First of all "React Boilerplate is a highly scalable, offline-first foundation with the best DX and a focus on performance and best practices.
It lets you start your next react project in seconds" (c). To learn more go to the original repository of the project: [React Boilerplate Project](https://github.com/mxstbr/react-boilerplate)

***But why we created the clone?*** 
 
We want to make this great development kit even more better and useful. So, we created a visual editor for React components. Then we integrated it with React Boilerplate in this clone by adding some meta data.
Although Structor is an autonomous Web application and runs outside of the application, it should have an access to the source code of the application.
   
Structor lets you generate scaffolds for components, containers, reducers, selectors and sagas. 
Additionally, Structor is a portal to a marketplace where you can find full-fledged React components and install their source code right into the application structure. 

You may compose/stylize a complex component using advanced UI editor and then just create the source code of a new component using sophisticated generators. 
Or you may choose to install the source code of a pre-created component into the application from marketplace.

Moreover, you have the ability to publish the source code of your component on Structor Market in order to share it or to preserve for another project.

Structor uses own Webpack Dev server to compile components, and that allows you to develop UI components in isolation from application.   

Structor is an open source tool, find its source code in [Structor Repository on GH](https://github.com/ipselon/structor).

***The clone is synced with every React Boilerplate release***

## Getting Started

1. Clone this repo using `git clone https://github.com/ipselon/react-boilerplate-clone.git` 
   OR 
   download and unpack ZIP [master.zip](https://github.com/ipselon/react-boilerplate-clone/archive/master.zip).
1. Run `npm run setup` to install dependencies and clean the git repo.
1. Run `npm run clean` to delete the example app.

At this point you may start developing your application. 
Learn more about the structure of the application from [React Boilerplate documentation](https://github.com/mxstbr/react-boilerplate#documentation) 

#### Running Structor

1. Run `npm run structor`
1. Open in the browser Structor's workspace: `http://localhost:2222/structor`.

Now you're ready to rumble!

## Structor features

### Sign Up to Structor Market

All source code generators are available through the cloud service. You should create an account to have the access to them.
* Open main menu and select `Sign in to Stuctor Market` option.
* Click on the `Create account` link.
* Follow the instruction.

<p align="center">
  <img src="https://raw.githubusercontent.com/ipselon/structor/master/docs/img/sign-up-structor-market.png" />
</p>

### Add component on the page (the first way)

* Click on the component on the page which will be a sibling or a parent of the new component.
* Click on one of the appending buttons (`Add Before`, `Insert First`, `Replace`, `Insert Last`, `Add After`) from the top toolbar which you may see right above the selected component.
* In the dialog type the name of a new component. (Here you may type the sequence of nested components delimited by dot)

<p align="center">
  <img src="https://raw.githubusercontent.com/ipselon/structor/master/docs/img/add-component-1.png" />
</p>

### Add component on the page (the second way)

* Open the list of available components by clicking on the plus button.
* Click on the needed component item - it copies the component into the clipboard. 
* Select component which will be a sibling or a parent component for the component in the clipboard.
* Click on one of the appending buttons (`Add Before`, `Insert First`, `Replace`, `Insert Last`, `Add After`) from the top toolbar which you may see right above the selected component. 

<p align="center">
  <img src="https://raw.githubusercontent.com/ipselon/structor/master/docs/img/add-component-2.png" />
</p>

### Change style of selected component on the page

* Select desired component on the page.
* Open quick options/styles panel.
* Set style option from the list.

<p align="center">
  <img src="https://raw.githubusercontent.com/ipselon/structor/master/docs/img/change-component-style.png" />
</p>

### Scaffolding the component

* Select the component on the page.
* Click on the `New Component` button from the top toolbar of the workspace.
* Choose one of the scaffolds for components (`Scaffold generators` tab).
* Follow the wizard:
    * You may create the source code which includes all nested components into the source code. After that you will not be able to change properties of children right on the page.
    * After installation you may find new source code in `app/components/<Group>/<ComponentName>` or `app/containers/<Group>/<ComponentName>`
    * If you choose to create a Redux container you will find out that there are all bunch of needed files for Redux container: actions, constants, reducer and saga.
    * Structor is including Redux container in own Redux state which stands apart from application's Redux state. Find in `.structor/app` directory how Redux container is included into the Structor's state.  
    
<p align="center">
  <img src="https://raw.githubusercontent.com/ipselon/structor/master/docs/img/scaffolding-component-1.png" />
</p>
    
* New component will appear in the list of available components. 

<p align="center">
  <img src="https://github.com/ipselon/structor/blob/master/docs/img/scaffolding-component-2.png" />
</p>

### Install pre-created component from marketplace

* Add empty `div` component somewhere on the page.
* Click on the `New Component` button from the top toolbar.
* Choose or search the needed component on the `All available generators`.
* Follow the wizard:
    * Some of pre-created components may inject npm dependencies. These deps will be installed after the source code is downloaded.
    * Some of pre-created components may add global imports like CSS files or additional resources. Such files will be placed into `app/assets` directory and will be imported through `.structor/app/components.js` file. These files should be injected manually into `app/app.js` file in order to use the component in your app.  
    
<p align="center">
  <img src="https://raw.githubusercontent.com/ipselon/structor/master/docs/img/install-component.png" />
</p>

### View page structure

* Click on the code button.

<p align="center">
  <img src="https://raw.githubusercontent.com/ipselon/structor/master/docs/img/treeview-page-structure.png" />
</p>

## The changes made in original boilerplate

1. `.structor` metadata directory is added.
1. Additional `structor` command is added into `scripts` section in `package.json` file.
1. Additional `app/assets` directory is added.
1. In order to use custom CSS files without packing them into npm modules the following changes were made in `webpack.base.babel.js`:
```diff
{
  test: /\.css$/,
-  include: /node_modules/,
+  include: [/node_modules/, /app[\\\/]assets/],
  loaders: ['style-loader', 'css-loader'],
}
``` 

## License

This project is licensed under the MIT license, Copyright (c) 2016 Maximilian
Stoiber. For more information see [LICENSE.md](https://github.com/mxstbr/react-boilerplate/blob/master/LICENSE.md).
