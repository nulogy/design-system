import propTypes from "@styled-system/prop-types";
import type React from "react";
import { forwardRef } from "react";
import { MaybeFieldLabel } from "../FieldLabel";
import { Field } from "../Form";
import { useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { getSubset, omitSubset } from "../utils/subset";
import { InlineValidation } from "../Validation";
import type { StyledTextareaProps } from "./StyledTextarea";
import StyledTextarea from "./StyledTextarea";

type TextareaProps = StyledTextareaProps & {
	className?: string;
	id?: string;
	disabled?: boolean;
	errorMessage?: string;
	error?: boolean;
	errorList?: string[];
	required?: boolean;
	labelText?: string;
	helpText?: React.ReactNode;
	requirementText?: string;
	rows?: number;
	isResizeable?: boolean;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{
			disabled = false,
			required = false,
			rows = 3,
			errorMessage,
			errorList,
			error = !!(errorMessage || errorList),
			labelText,
			requirementText,
			helpText,
			id,
			className,
			isResizeable = true,
			variant,
			...props
		},
		ref,
	) => {
		const componentVariant = useComponentVariant(variant);
		const spaceProps = getSubset(props, propTypes.space);
		const restProps = omitSubset(props, propTypes.space);

		return (
			<Field className={className} {...spaceProps}>
				<MaybeFieldLabel
					labelText={labelText}
					requirementText={requirementText}
					helpText={helpText}
				>
					<StyledTextarea
						aria-invalid={error}
						aria-required={required}
						required={required}
						id={id}
						ref={ref}
						errorMessage={errorMessage}
						errorList={errorList}
						error={error}
						rows={rows}
						isResizeable={isResizeable}
						variant={componentVariant}
						disabled={disabled}
						{...restProps}
					/>
				</MaybeFieldLabel>
				<InlineValidation
					mt="x1"
					errorMessage={errorMessage}
					errorList={errorList}
				/>
			</Field>
		);
	},
);

export default Textarea;
