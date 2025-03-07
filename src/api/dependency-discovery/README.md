# Dependency Discovery Service

The dependency discovery service provides information about the
dependencies that Telescope uses.

## Install

Run `pnpm install` from the root of the Telescope project.

## Usage

```
# For development mode
pnpm dev

# For regular mode
pnpm start
```

By default, the server is listening on port 10500 (http://localhost:10500).

### Examples

- `GET /projects` - Returns an array of the package names used by Telescope
-

## Docker / `docker-compose`

### Docker

TODO

### `docker-compose`

TODO

## Good Things to Know

The dependency discovery service is somewhat special, since it
depends on a file called `deps.txt` placed at the root of the service
project.

This file is generated by a script found in `tools`. The file gets
automatically generated every release, as a way to keep track
of Telescope direct dependencies on every release.

If for some reason you need to generate the `deps.txt` file manually,
you may run the script with

```bash
# In the root
node tools/collect-dependencies.js -- -o deps.txt
```
