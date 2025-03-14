import {
  Group,
  Text,
  rem,
  Stack,
  Image,
  SimpleGrid,
  LoadingOverlay,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { HiUpload, HiPhotograph, HiX } from "react-icons/hi";
import { useState } from "react";
import { uploadImage } from "../../services/ImageService";

export default function ImageUploader({ images, setImages, maxFiles = 5 }) {
  const [loading, setLoading] = useState(false);

  const handleDrop = async (files) => {
    setLoading(true);
    try {
      const uploadPromises = files.map((file) => uploadImage(file));
      const responses = await Promise.all(uploadPromises);
      const newUrls = responses.map((response) => response.data.data.url);
      setImages(newUrls);

      notifications.show({
        title: "Success",
        message: "Images uploaded successfully",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to upload images",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Stack>
      <Dropzone
        onDrop={handleDrop}
        accept={IMAGE_MIME_TYPE}
        maxFiles={maxFiles}
        maxSize={5 * 1024 * 1024} // 5MB
        disabled={loading}
      >
        <Group
          justify="center"
          gap="xl"
          mih={120}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <HiUpload
              size={52}
              style={{
                color: "var(--mantine-color-blue-6)",
              }}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <HiX
              size={52}
              style={{
                color: "var(--mantine-color-red-6)",
              }}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <HiPhotograph
              size={52}
              style={{
                color: "var(--mantine-color-dimmed)",
              }}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Kéo thả hình ảnh vào đây hoặc nhấn để chọn file
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Tối đa {maxFiles} hình ảnh, mỗi hình tối đa 5MB
            </Text>
          </div>
        </Group>
      </Dropzone>

      {loading && <LoadingOverlay visible={true} />}

      {images.length > 0 && (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
          {images.map((url, index) => (
            <Image
              key={index}
              src={url}
              radius="md"
              h={160}
              w="auto"
              fit="cover"
              onLoad={() => URL.revokeObjectURL(url)}
              withCloseButton
              onClose={() => removeImage(index)}
            />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}
