import { ChevronDown, X } from "lucide-react"
import { type ComponentProps, forwardRef, useMemo } from "react"
import type {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
} from "react-select"
import ReactSelect, { components } from "react-select"

import { cn } from "@/lib/utils"

type SelectProps = Omit<
  ComponentProps<typeof ReactSelect>,
  "loadingMessage" | "noOptionsMessage"
> & {
  "aria-invalid"?: boolean
  loadingMessage?: string
  noOptionsMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerRef?: any
}

type Option = {
  value: string | number
  label: string | number
}

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown className="h-4 w-4" />
    </components.DropdownIndicator>
  )
}

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <X className="h-4 w-4" />
    </components.ClearIndicator>
  )
}

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <X className="h-4 w-4" />
    </components.MultiValueRemove>
  )
}

const controlStyles = {
  base: "border border-border rounded-md bg-transparent hover:cursor-pointer w-full h-full disabled:cursor-not-allowed disabled:opacity-50",
  focus: "border border-border-active",
  nonFocus: "border-border hover:border-border-active",
  invalid: "border border-border-invalid hover:border-border-invalid",
}
const placeholderStyles = "text-muted pl-2 py-0.5"
const selectInputStyles = "pl-1 "
const valueContainerStyles = "p-1 gap-1"
const singleValueStyles = "leading-7 ml-1"
const multiValueStyles =
  "dark:bg-popover bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5"
const multiValueLabelStyles = "leading-6 py-0.5"
const multiValueRemoveStyles = "hover:text-red-800 text-gray-500 rounded-md"
const indicatorsContainerStyles = "p-1 gap-1"
const clearIndicatorStyles =
  "text-muted-foreground hover:text-red-500 p-1 rounded-md"
const indicatorSeparatorStyles = "bg-border"
const dropdownIndicatorStyles =
  "p-1 text-muted-foreground rounded-md dark:hover:text-white hover:text-gray-700"
const menuStyles =
  "p-1 mt-2 border drop-shadow-2xl border-border bg-popover rounded-md"
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-muted text-sm"
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded",
  focus:
    "bg-gray-100 dark:bg-background/80 active:bg-gray-200 dark:active:bg-gray-950",
  selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
}
const noOptionsMessageStyles = "text-foreground p-2 bg-transparent"

const Select = forwardRef<unknown, SelectProps>(
  (
    {
      className,
      closeMenuOnSelect = true,
      closeMenuOnScroll = true,
      hideSelectedOptions = true,
      isClearable = true,
      loadingMessage = "carregando...",
      noOptionsMessage = "Nenhum item encontrado",
      "aria-invalid": ariaInvalid = false,
      innerRef,
      defaultValue: defaultValueInput,
      ...props
    },
    ref
  ) => {
    const defaultValue = useMemo((): Option | Array<Option> | undefined => {
      if (
        defaultValueInput === undefined ||
        defaultValueInput === null ||
        props.options?.length === 0
      )
        return undefined

      if (props?.isMulti) {
        const options = props?.options as Array<Option>
        const value = defaultValueInput as string[]

        const parsedValue = value?.map((currentValue) =>
          currentValue ? currentValue?.toString() : ""
        )
        return options?.filter(
          (option) =>
            parsedValue?.includes(option?.value?.toString()) ||
            parsedValue?.includes(option?.label?.toString())
        )
      }

      const options = props.options as Array<Option>

      return options?.filter(
        (option) =>
          option.value.toString() === defaultValueInput.toString() ||
          option.label.toString() === defaultValueInput.toString()
      )
    }, [defaultValueInput, props?.isMulti, props.options])

    return (
      <ReactSelect
        className={cn(
          "h-11 w-full rounded-md text-sm sm:min-w-[20rem]",
          props?.isMulti && "h-fit min-h-11",
          className
        )}
        ref={innerRef || ref}
        closeMenuOnSelect={closeMenuOnSelect}
        closeMenuOnScroll={closeMenuOnScroll}
        loadingMessage={() => <span>{loadingMessage}</span>}
        noOptionsMessage={() => <span>{noOptionsMessage}</span>}
        hideSelectedOptions={hideSelectedOptions}
        isClearable={isClearable}
        components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
        unstyled
        styles={{
          input: (base) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
            },
          }),
          multiValueLabel: (base) => ({
            ...base,
            whiteSpace: "normal",
            overflow: "visible",
          }),
          control: (base) => ({
            ...base,
            transition: "none",
          }),
        }}
        classNames={{
          control: ({ isFocused }) =>
            cn(
              controlStyles.base,
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              ariaInvalid && controlStyles.invalid
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) =>
            cn(
              isFocused && optionStyles.focus,
              isSelected && optionStyles.selected,
              optionStyles.base
            ),
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
        defaultValue={defaultValue}
        {...props}
      />
    )
  }
)
Select.displayName = "Select"
export { Select }
