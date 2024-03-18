# Book-v

## Description

Book-v is a mobile application designed to enable vendors to easily manage their availability.

## Technologies Used

- React
- React Native
- Expo
- Expo dev-client
- TypeScript
- Firebase
- Node.js
- Jest (for testing)

## Setup Instructions

1. Clone the repository.
2. Run `yarn install`.
3. Download the development build of the application from [this link](https://expo.dev/artifacts/eas/46wEvG5g9beGMfa1CKa8Pa.tar.gz).
4. Add the environment variable received via email.
5. Run `yarn start` to start the development server.

## Key Components

### React Native Responsive Screen

The `react-native-responsive-screen` library is used to handle responsiveness by calculating sizes based on device DPI value.

### CustTextInput

A customizable text input component for React Native.

#### Props

- `editable`: Boolean value to determine if the input is editable.
- `placeholder`: Placeholder text for the input.
- `defaultValue`: Default value for the input.
- `value`: Current value of the input.
- `maxLength`: Maximum length of the input.
- `hidden`: Boolean value to determine if the input is hidden.
- `multiLine`: Boolean value to determine if the input supports multiple lines.
- `onChange`: Function called when the input value changes.
- `onFocus`: Function called when the input is focused.
- `wrapperStyle`: Custom style object for the input wrapper.
- `style`: Custom style object for the input text.
- `keyboardType`: Type of keyboard to display.

## TextComponent

TextComponent is a versatile text component for React Native that supports different text styles and font families.

### Props

- `type`: Type of text style to apply ("h1", "h2", "h3", "plain-bold", "plain-light", "plain").
- `children`: Text content to display.
- `style`: Custom style object for the text.
- `color`: Color of the text.
- `fontSize`: Font size of the text.
- `fontFamily`: Font family for the text.
- `center`: Boolean value to determine if the text should be centered.

## CustButton

CustButton is a customizable button component for React Native.

### Props

- `children`: Content to display inside the button.
- `type`: Type of button ("close", "default", "rounded", "rounded-rect", "back", "forward").
- `style`: Custom style object for the button.
- `color`: Color of the button.
- `size`: Size of the button icon.
- `width`: Width of the button.
- `testID`: Test ID for testing purposes.
- `onPress`: Function to handle button press event.

## Helper Functions
### message
This function displays a toast message.

#### Params:

- `msg`: string - The message to be displayed.
-`status`: "success" | "failure" | undefined (optional) - Status of the message.
-`duration`: "LONG" | "SHORT" | number (optional) - Duration for which the message should be displayed.

### prepFileForUpload
This function prepares a file for upload by extracting necessary information from it.

#### Params:

-`file`: ImagePickerAsset | DocumentPickerSuccessResult - The file to be prepared.
-`type`: "document" | "image" - Type of file.

### capitalize1stLetterOfEachWord
This function capitalizes the first letter of each word in a sentence.

#### Params:

-`sentence`: string - The sentence to be capitalized.

### truncateString
This function truncates a string to a specified length and appends "..." if necessary.

#### Params:

-`string`: string - The string to be truncated.
-`returnLength`: number (optional) - Length at which to truncate the string.

### isValidEmail
This function checks if a given string is a valid email address.

#### Params:

-`email`: string - The email address to be validated.

### isValidPhonenumber
This function checks if a given string is a valid phone number.

#### Params:

-`phoneNumber`: string - The phone number to be validated.
-`countryCode`: any (optional) - The country code for the phone number.

# BookingScreen Documentation

The `BookingScreen` component is responsible for displaying a calendar view with booked dates and available slots for bookings. It utilizes various sub-components and libraries to provide this functionality efficiently.

## Overview

The component consists of a calendar view (`Agenda` from `react-native-calendars`) to display booked dates and available slots. Users can interact with the calendar to select dates and view available slots for booking appointments.

### Libraries Used:
- `react-native`
- `react-native-calendars`
- `moment`
- `@expo/vector-icons`
- `@tanstack/react-query`

## Usage

### Props
- No props are passed to this component directly.

## Sub-components
1. RenderItem
#### Props:
- `selectedDay`: string - The selected day for which availability is being rendered.
-`refreshFunc`: () => void - Function to refresh the availability data.
-`index`: number - Index of the availability item.
-`availabilityData`: Availability - Data representing the availability slot.
This component renders each availability slot within the FlatList of the Agenda component. It displays the availability name, description, and provides an option to delete the availability slot.

2. AddButn
#### Props:
-`selectedDay`: string - The selected day for which availability is being added.
-`refreshFunc`: () => void - Function to refresh the availability data.
-`activeDataIndex`: number - Index of the active availability data.
This component renders an "Add" button allowing users to add new availability slots. It opens a modal to input details for a new availability slot.

## Performance Considerations
The Agenda component can be resource-intensive, especially when rendering a large number of items. Hence, it's essential to optimize the rendering of sub-components like RenderItem and AddButn. These components should be lightweight and efficient to ensure smooth performance.

## Conclusion
The BookingScreen component provides a comprehensive interface for managing bookings efficiently. By utilizing optimized sub-components and libraries, it ensures a smooth user experience even when dealing with a heavy calendar component.

