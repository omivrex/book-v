# book-v
An app for managing bookings and appointments for vendors

# TextComponent

The `TextComponent` is a customizable text component designed for use in React Native applications. It allows for easy styling of text elements with various predefined styles.

## Usage

```jsx
import TextComponent from '../../components/Text.component';

<TextComponent
  type="h1" // Type of text (optional)
  style={{}} // Custom style object (optional)
  color="black" // Text color (optional)
  fontSize={20} // Font size (optional)
  fontFamily="Poppins_600SemiBold" // Font family (optional)
  center={true} // Center align text (optional)
>
  Your Text Here
</TextComponent> ```


## CustTextInput

A customizable text input component for React Native.

### Props

- `editable`: Boolean value to determine if the input is editable. Defaults to `true`.
- `placeholder`: Placeholder text for the input.
- `defaultValue`: Default value for the input.
- `value`: Current value of the input.
- `maxLength`: Maximum length of the input.
- `hidden`: Boolean value to determine if the input is hidden (e.g., for passwords). Defaults to `false`.
- `multiLine`: Boolean value to determine if the input supports multiple lines. Defaults to `false`.
- `onChange`: Function called when the input value changes.
- `onFocus`: Function called when the input is focused.
- `wrapperStyle`: Custom style object for the input wrapper.
- `style`: Custom style object for the input text.
- `keyboardType`: Type of keyboard to display (e.g., "numeric", "email-address").

#### Usage

```markdown
<InputComponent
  type="text"
  placeholder="Enter your text"
  defaultValue=""
  maxLength={50}
  onChange={(text) => console.log(text)}
/>
