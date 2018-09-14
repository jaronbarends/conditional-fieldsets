# Conditional fieldsets

show / hide (sets of) form elements depending on status of radio buttons or checkboxes

Form validation will discard any hidden fields

## Getting started

### Required files

include conditional-fieldsets.css and conditional-fieldset.js in your document

### Bind radio buttons or checkboxes to container

```html
<input type="checkbox"
	id="my-cb-1"
	data-has-conditional-fieldset
	data-conditional-fieldset-id="1">
<label for="my-cb-1">Some label</label>

<fieldset class="o-conditional-fieldset o-conditional-fieldset--is-hidden" 
		data-conditional-fieldset
		data-conditional-fieldset-id="1">
	<label for="my-input-1">Some other label</label>
	<input type="text" id="my-input-1" name="bla">
</fieldset>
```

## options to still document

hide when other is shown: use `data-conditional-group-id`

show element when checkbox is unchecked: use`data-conditional-inverse="true"`