#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const packageJsonPath = path.join(__dirname, '..', 'package.json')
const blutuiPath = path.join(__dirname, '..', 'src', 'blutui.ts')

// Get the current version from package.json
function getPackageJsonVersion() {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  return packageJson.version
}

// Bump the version based on the given version type
function bumpVersion(currentVersion, type) {
  const versionParts = currentVersion.split('.').map(Number)

  switch (type) {
    case '--major':
      versionParts[0]++
      versionParts[1] = 0
      versionParts[2] = 0
      break
    case '--minor':
      versionParts[1]++
      versionParts[2] = 0
      break
    case '--patch':
      versionParts[2]++
      break
    default:
      throw new Error('Invalid argument. Use --major, --minor, or --patch')
  }

  return versionParts.join('.')
}

// Update the package.json version
function updatePackageJsonVersion(newVersion) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  packageJson.version = newVersion
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)
}

// Update VERSION constant in blutui.ts
function updateBlutuiVersion(newVersion) {
  let blutuiContent = fs.readFileSync(blutuiPath, 'utf-8')
  const versionRegex = /const VERSION = '([0-9]+\.[0-9]+\.[0-9]+)'/

  blutuiContent = blutuiContent.replace(
    versionRegex,
    `const VERSION = '${newVersion}'`
  )

  fs.writeFileSync(blutuiPath, blutuiContent)
}

// The main function
function main() {
  const args = process.argv.slice(2)
  if (args.length !== 1) {
    console.error(
      'Please provide exactly one argument: --major, --minor, or --patch'
    )
    process.exit(1)
  }

  const currentVersion = getPackageJsonVersion()
  const newVersion = bumpVersion(currentVersion, args[0])

  updatePackageJsonVersion(newVersion)
  updateBlutuiVersion(newVersion)

  console.log(`Version updated from ${$currentVersion} to ${newVersion}`)
}

main()
