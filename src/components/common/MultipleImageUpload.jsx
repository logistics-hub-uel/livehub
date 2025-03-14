import React, { useState } from "react";
import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Image,
  Card,
  ActionIcon,
  Loader,
  SimpleGrid,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
// Replace Tabler Icons with React Icons
import { FaUpload, FaImage, FaTimes, FaTrash } from "react-icons/fa";
import { uploadImage, getImageUrl } from "../../services/ImageService";
import { notifications } from "@mantine/notifications";

const MultipleImageUpload = ({ onImagesUploaded, existingImages = [] }) => {
  const theme = useMantineTheme();
  const [images, setImages] = useState(existingImages);
  const [uploading, setUploading] = useState(false);

  const handleDrop = async (files) => {
    setUploading(true);
    const uploadPromises = files.map((file) => uploadImage(file));

    try {
      const responses = await Promise.all(uploadPromises);
      const newImageUrls = responses.map((response) => {
        return response.data.data.url;
      });

      // Add new images to the existing ones
      const updatedImages = [...images, ...newImageUrls];
      setImages(updatedImages);

      // Notify parent component of the updated image URLs
      onImagesUploaded(updatedImages);

      notifications.show({
        title: "Success",
        message: `${files.length} image(s) uploaded successfully`,
        color: "green",
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      notifications.show({
        title: "Error",
        message: "Failed to upload images",
        color: "red",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
    onImagesUploaded(updatedImages);
  };

  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        accept={IMAGE_MIME_TYPE}
        loading={uploading}
        mb="md"
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(100), pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <FaUpload
              size={rem(50)}
              color={theme.colors[theme.primaryColor][4]}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <FaTimes size={rem(50)} color={theme.colors.red[5]} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <FaImage size={rem(50)} />
          </Dropzone.Idle>

          <div>
            <Text size="lg" inline align="center">
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7} align="center">
              Upload multiple images for your service
            </Text>
          </div>
        </Group>
      </Dropzone>

      {uploading && (
        <Group position="center" mt="md">
          <Loader />
        </Group>
      )}

      {images.length > 0 && (
        <>
          <Text size="sm" weight={500} mb="xs">
            Uploaded Images
          </Text>
          <SimpleGrid cols={4} breakpoints={[{ maxWidth: "sm", cols: 2 }]}>
            {images.map((image, index) => (
              <Card key={index} p="xs" withBorder>
                <Card.Section>
                  <Image
                    src={image}
                    height={120}
                    fit="cover"
                    alt={`Uploaded image ${index + 1}`}
                  />
                </Card.Section>
                <Group position="right" mt="xs">
                  <ActionIcon color="red" onClick={() => removeImage(index)}>
                    <FaTrash size={16} />
                  </ActionIcon>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  );
};

export default MultipleImageUpload;
