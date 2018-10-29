# How to add an icon

## Save the image

1.  Make sure the image is an svg file
1.  Save the .svg file to client/js/components/icons/svgs
1.  Rename the file to be descriptive of what the image is (file names should be lowercase)

## Run SVG to React tool

1.  Run the following command, replacing `location` with the name of the file and `LocationIcon` with the name of the React component that will be created:

`npx svgtoreact client/js/components/icons/svgs/location LocationIcon --output ./client/js/components/icons`

2.  Change the name of the file to be lowercase, with a hypen. For example: `location-icon.js`
3.  It's now ready to be used - just import the React component and you're set!

[Link to documentation](https://www.npmjs.com/package/svg-to-react-cli)
