import { notifications } from "@mantine/notifications";

export const showErrorNotification = (message) => {
  notifications.show({
    id: "hello-there",
    position: "bottom-center",
    withCloseButton: true,
    onClose: () => console.log("unmounted"),
    onOpen: () => console.log("mounted"),
    autoClose: 5000,
    title: "You've been compromised",
    message: "Leave the building immediately",
    color: "red",
    icon: <IconX />,
    style: { backgroundColor: "red" },
    loading: false,
  });

  // notifications.showNotification({
};
