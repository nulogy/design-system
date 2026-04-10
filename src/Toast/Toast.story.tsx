import { useState } from "react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import type { NotificationType } from "../Alert/Alert";
import {
	Button,
	DangerButton,
	Flex,
	IconicButton,
	Modal,
	PrimaryButton,
	Toast,
} from "../index";

export default {
	title: "Components/Toast",
};

export const _Toast = {
	render: () => {
		const ToastWithTrigger = () => {
			const [triggered, setTriggered] = useState(false);
			const triggerToast = () => {
				setTriggered(!triggered);
			};
			const onHideHandler = () => {
				setTriggered(false);
			};
			return (
				<>
					<Button onClick={triggerToast}>Save Changes</Button>
					<Toast triggered={triggered} onHide={onHideHandler}>
						Saved
					</Toast>
				</>
			);
		};
		return <ToastWithTrigger />;
	},
	name: "Toast",
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step("is hidden by default", async () => {
			await expect(screen.queryByRole("alert")).not.toBeInTheDocument();
		});
		await step("shows toast when triggered", async () => {
			await userEvent.click(canvas.getByText("Save Changes"));
			await waitFor(() => expect(screen.getByRole("alert")).toBeVisible());
		});
	},
};

export const _MultipleToastsExample = {
	render: () => {
		const MultipleToastsExample = () => {
			const [currentToast, setCurrentToast] = useState(undefined);
			const triggerToast = (toastName) => {
				setCurrentToast(toastName);
			};
			/* Alternate trigger toast fn adds a delay between toasts
      const triggerToast = toastName => {
        if (!currentToast) {
          setCurrentToast(toastName);
        } else {
          // adds a delay between toasts
          setTimeout(() => {
            setCurrentToast(toastName);
          }, 200);
        }
      }; */
			const onHideHandler = (toastName) => {
				if (currentToast === toastName) {
					setCurrentToast(undefined);
				}
			};
			const TOAST_ACTIONS = {
				SAVE: "save",
				RESET: "reset",
				DELETE: "delete",
				ERROR: "error",
			};
			const TOASTS: Array<{
				action: string;
				message: string;
				type: NotificationType;
			}> = [
				{
					action: TOAST_ACTIONS.SAVE,
					message: "Saved all your changes",
					type: "success",
				},
				{
					action: TOAST_ACTIONS.RESET,
					message: "Reset all your changes",
					type: "success",
				},
				{
					action: TOAST_ACTIONS.DELETE,
					message: "Ok, it's deleted",
					type: "success",
				},
				{
					action: TOAST_ACTIONS.ERROR,
					message: "An error occurred, please retry",
					type: "danger",
				},
			];
			return (
				<>
					<Flex alignItems="center">
						<PrimaryButton
							onClick={() => triggerToast(TOAST_ACTIONS.SAVE)}
							mr="x2"
						>
							Save Changes
						</PrimaryButton>
						<Button onClick={() => triggerToast(TOAST_ACTIONS.RESET)} mr="x2">
							Reset
						</Button>
						<DangerButton
							onClick={() => triggerToast(TOAST_ACTIONS.ERROR)}
							mr="x2"
						>
							Trigger Error
						</DangerButton>
						<IconicButton
							icon="delete"
							onClick={() => triggerToast(TOAST_ACTIONS.DELETE)}
						>
							Delete
						</IconicButton>
					</Flex>
					{TOASTS.map((toast) => {
						return (
							<Toast
								triggered={currentToast === toast.action}
								onHide={() => onHideHandler(toast.action)}
								type={toast.type}
								key={toast.action}
							>
								{toast.message}
							</Toast>
						);
					})}
				</>
			);
		};
		return <MultipleToastsExample />;
	},

	name: "multiple toasts example",
};

export const CustomizeLengthOfTimeToastIsVisible = {
	render: () => {
		const ToastWithTrigger = () => {
			const [triggered, setTriggered] = useState(false);
			const triggerToast = () => {
				setTriggered(!triggered);
			};
			const onHideHandler = () => {
				setTriggered(false);
			};
			return (
				<>
					<Button onClick={triggerToast}>Save Changes</Button>
					<Toast
						triggered={triggered}
						onHide={onHideHandler}
						showDuration={5000}
					>
						Saved
					</Toast>
				</>
			);
		};
		return <ToastWithTrigger />;
	},

	name: "customize length of time toast is visible",
};

export const WithCloseButton = {
	render: () => {
		const ToastWithTrigger = () => {
			const [triggered, setTriggered] = useState(false);
			const triggerToast = () => {
				setTriggered(!triggered);
			};
			const onHideHandler = () => {
				setTriggered(false);
			};
			return (
				<>
					<Button onClick={triggerToast}>Save Changes</Button>
					<Toast triggered={triggered} onHide={onHideHandler} isCloseable>
						An error occurred while saving results. Please try again
					</Toast>
				</>
			);
		};
		return <ToastWithTrigger />;
	},

	name: "with close button",
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step("is hidden by default", async () => {
			await expect(screen.queryByRole("alert")).not.toBeInTheDocument();
		});
		await step("shows toast when triggered", async () => {
			await userEvent.click(canvas.getByText("Save Changes"));
			await waitFor(() => expect(screen.getByRole("alert")).toBeVisible());
		});
		await step("hides toast when close button is clicked", async () => {
			await userEvent.click(screen.getByLabelText("Close"));
			await waitFor(() =>
				expect(screen.queryByRole("alert")).not.toBeInTheDocument(),
			);
		});
	},
};

export const WithModal = {
	render: () => (
		<>
			<Toast triggered={true} type="danger" isCloseable zIndex={1001}>
				Something went wrong. Try again.
			</Toast>
			<Modal title="Modal Title" onRequestClose={() => {}} maxWidth="456px">
				Modal Body
			</Modal>
		</>
	),

	name: "with a modal",
};

export const CloseableWithMultiLineMessage = {
	render: () => {
		const [triggered, setTriggered] = useState(false);

		const triggerToast = () => {
			setTriggered(!triggered);
		};

		const onHideHandler = () => {
			setTriggered(false);
		};

		return (
			<>
				<Button onClick={triggerToast}>Save Changes</Button>
				<Toast
					triggered={triggered}
					onHide={onHideHandler}
					type="danger"
					isCloseable
				>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
					quidem eveniet, repellat accusamus error reiciendis libero. Totam
					autem distinctio vo
				</Toast>
			</>
		);
	},

	name: "closeable with a 150 character long multi-line message",
};

export const MultipleCloseableToastsExample = {
	render: () => {
		const MultipleToastsExample = () => {
			const [currentToasts, setCurrentToasts] = useState([]);
			const triggerToast = (toastName) => {
				setCurrentToasts([...currentToasts, toastName]);
			};
			const onHideHandler = (toastName) => {
				setCurrentToasts(currentToasts.filter((toast) => toast !== toastName));
			};
			const TOAST_ACTIONS = {
				SAVE: "save",
				RESET: "reset",
				DELETE: "delete",
				ERROR: "error",
			};
			const TOASTS = [
				{
					action: TOAST_ACTIONS.SAVE,
					message: "Error saving all your changes",
				},
				{
					action: TOAST_ACTIONS.RESET,
					message: "Error: changes were reset",
				},
				{
					action: TOAST_ACTIONS.DELETE,
					message: "An error occurred, could not deleted",
				},
				{
					action: TOAST_ACTIONS.ERROR,
					message: "An error occurred, please retry",
				},
			];
			return (
				<>
					<Flex alignItems="center">
						<PrimaryButton
							onClick={() => triggerToast(TOAST_ACTIONS.SAVE)}
							mr="x2"
						>
							Save Changes
						</PrimaryButton>
						<Button onClick={() => triggerToast(TOAST_ACTIONS.RESET)} mr="x2">
							Reset
						</Button>
						<DangerButton
							onClick={() => triggerToast(TOAST_ACTIONS.ERROR)}
							mr="x2"
						>
							Trigger Error
						</DangerButton>
						<IconicButton
							icon="delete"
							onClick={() => triggerToast(TOAST_ACTIONS.DELETE)}
						>
							Delete
						</IconicButton>
					</Flex>
					{TOASTS.map((toast) => {
						return (
							<Toast
								triggered={currentToasts.includes(toast.action)}
								onHide={() => onHideHandler(toast.action)}
								type="danger"
								key={toast.action}
								isCloseable
							>
								{toast.message}
							</Toast>
						);
					})}
				</>
			);
		};
		return <MultipleToastsExample />;
	},

	name: "multiple closeable toasts example",
};
