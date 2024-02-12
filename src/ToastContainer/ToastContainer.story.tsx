import React, { useState } from "react";
import { ToastPosition } from "react-hot-toast";
import { PrimaryButton } from "../Button";
import { Input } from "../Input";
import { Flex } from "../Flex";
import { Select } from "../Select";
import { Heading1, Text } from "../Type";
import ToastContainer from "./ToastContainer";
import toast from "./ToastFunction";

const getToastFunctionTemplate = ({
  isClosable = false,
  toastType = "informative",
} = {}) => `toast.${toastType}("This is a toast content", {
  title: "This is a '${toastType}' type toast title",
  isCloseable: ${isClosable},
})`;

export const WithEverything = () => {
  const [behavior, setBehavior] = useState("random");
  const [position, setPosition] = useState<ToastPosition>("bottom-center");
  const [type, setType] = useState("random");
  const [toastFunctionTemplate, setToastFunctionTemplate] = useState<string | undefined>();
  const [duration, setDuration] = useState<number | undefined>(2000);
  const [maxVisibleToasts, setMaxVisibleToasts] = useState<number | undefined>(8);

  const randomBoolean = () => Boolean(Math.round(Math.random()));
  const randomIndex = (length: number) => Math.floor(Math.random() * length);
  const isCloseable = () => (behavior === "random" ? randomBoolean() : behavior !== "auto");
  const toastType = () => (type === "random" ? types[randomIndex(types.length)].value : type);

  const types = [
    { value: "informative", label: "Informative" },
    { value: "success", label: "Success" },
    { value: "warning", label: "Warning" },
    { value: "danger", label: "Danger" },
  ];

  return (
    <>
      <Heading1>Toast container playground</Heading1>
      <Flex gap="x3" flexDirection="column" maxWidth="600px">
        <Flex flexDirection="column" flexBasis="100%" gap="x2">
          <Flex flexDirection="column">
            <Text fontWeight="bold">
              1) Add the {"<ToastContainer />"} to a top level component in your UI tree. The {"<ToastContainer />"}{" "}
              should always be mounted when you call the `toast` function bellow
            </Text>
            <pre>{`import { ToastContainer } from "@nulogy/components"`}</pre>
            <pre>{`<ToastContainer position="${position}" maxVisibleToasts={${maxVisibleToasts}} toastOptions={{ duration: ${duration} }} />`}</pre>
          </Flex>
          <Input
            value={duration}
            labelText="Show duration in milliseconds"
            onChange={(event) => {
              setDuration(Number(event.target.value));
            }}
          />
          <Input
            value={maxVisibleToasts}
            labelText="Maximum number of visible toasts"
            onChange={(event) => {
              setMaxVisibleToasts(Number(event.target.value));
            }}
          />
          <Select
            defaultValue={position}
            options={[
              { value: "bottom-center", label: "Bottom center" },
              { value: "bottom-left", label: "Bottom left" },
              { value: "bottom-right", label: "Bottom right" },
              { value: "top-center", label: "Top center" },
              { value: "top-left", label: "Top left" },
              { value: "top-right", label: "Top right" },
            ]}
            labelText="Position"
            onChange={(value) => setPosition(value as ToastPosition)}
          />
        </Flex>
        <Flex flexDirection="column" flexBasis="100%" gap="x2">
          <Flex flexDirection="column">
            <Text fontWeight="bold">Trigger toasts from anywhere using the `toast` function</Text>
            <pre>{`import { toast } from "@nulogy/components"`}</pre>
            <pre>{toastFunctionTemplate ?? getToastFunctionTemplate()}</pre>
          </Flex>
          <Flex gap="x2" flexDirection="column">
            <Select
              defaultValue={type}
              options={[{ value: "random", label: "Random" }, ...types]}
              labelText="Type"
              onChange={(value) => setType(value as ToastPosition)}
            />
            <Select
              defaultValue={behavior}
              options={[
                { label: "Random", value: "random" },
                { label: "Dismissible", value: "dismissible" },
                { label: "Auto-dismissed", value: "auto" },
              ]}
              labelText="Behavior"
              onChange={(value) => setBehavior(value as ToastPosition)}
            />
            <PrimaryButton
              onClick={() => {
                const toastTypeValue = toastType();
                const isClosableValue = isCloseable();

                setToastFunctionTemplate(
                  getToastFunctionTemplate({ isClosable: isClosableValue, toastType: toastTypeValue })
                );

                toast[toastTypeValue]("This is a toast content", {
                  title: `This is a '${toastTypeValue}' type toast title`,
                  isCloseable: isClosableValue,
                });
              }}
            >
              Trigger toast
            </PrimaryButton>
          </Flex>
        </Flex>
        <ToastContainer position={position} toastOptions={{ duration }} maxVisibleToasts={maxVisibleToasts} />
      </Flex>
    </>
  );
};

export default {
  title: "Components/ToastContainer",
};
