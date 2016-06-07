autostarter
===========

Project starter

Usage
-----

```
autostarter <src> <dest> [options]
```

`<src>`: Path to the template container, relative to `~/.autostarter`

  * Each template must be stored in a container directory
  * Template containers must have a `root/` directory under its root directory
    with the actual template
  * Template containers must be stored in `~/.autostarter` directory

```
~/.autostarter/
 |- <foo container>
 |   |- root
 |   |   |- <foo template files here>
 |- <bar container>
 |   |- root
 |   |   |- <bar template files here>
```

Additional files and directories can be stored in the containers. Only `root/`
will be used by **autostarter** so the container can be a git repo and have some
documentation and metadata to make the template more maintainable

`<dest>`: Path to the destination

It can be absolute or relative to the current path

**autostarter** will create the directory and then all template files and
directories will be rendered by **mustache** and stored there

`[options]`

  * Options are parsed with [minimist](https://github.com/substack/minimist)
    and passed directly to [mustache.js](https://github.com/janl/mustache.js)
  * `<dest>` is passed to mustache as `options.name`

Example
-------

Let's build a template for our node modules

First define a directory template.

You can use [mustache](http://mustache.github.io/) in any file content and also
in file and directory names

```
~/.autostarter/
|- my-node-template/
   |- root/
      |- package.json
      |- src/
         |- {{ name }}.js
```

**package.json**

```json
{
  "name": "{{ name }}",
  "description": "{{ desc }}",
  "version": "0.1.0",
  "main": "src/{{ name }}.js",
  "dependencies": {},
  "devDependencies": {
    "eslint": "*"
  },
  "scripts": {
    "lint": "eslint"
  }
}
```

Let's create a *super useful* node module using the previous template

```
cd ~
autostarter my-node-template super-useful --desc "super useful node module"
```

Done!

**autostarter** have created a new directory called *super-useful* under your
current directory (user home in the example)

Under `~/super-useful` we can find our previously defined template witth all
placeholders replaced with the data passed through the command line

Install
-------

    npm install -g autostarter
