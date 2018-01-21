defineEnvVar PARENT_IMAGE_TAG "The tag of the parent image" "0.9.22";
overrideEnvVar TAG "1.0.0";
defineEnvVar SERVICE_USER "The hotelSearch service user" "hotelsearch";
defineEnvVar SERVICE_USER_PASSWORD "The hotelSearch service password" "secret";
defineEnvVar SERVICE_GROUP "The hotelSearch service group" "hotelsearch";
defineEnvVar SERVICE_USER_SHELL "The hotelSearch account shell" "/bin/bash";
defineEnvVar SERVICE_USER_HOME "The home of the hotelSearch account" "/opt/hotelSearch";
