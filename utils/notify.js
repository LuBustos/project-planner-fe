import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

export async function onCreateTriggerNotification(reminder, fields) {
  try {
    const date = new Date(reminder);

    // Create a time-based trigger
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

    // Create a trigger notification
   const response =  await notifee.createTriggerNotification(
      {
        title: fields.title,
        body: fields.description,
        android: {
          channelId: 'your-channel-id',
        },
      },
      trigger,
    );
    return response;
  } catch (error) {
    return error
  }
}


export async function foregroundService() {
  notifee.registerForegroundService((notification) => {
    return new Promise(() => {
      // Long running task...
    });
  });
}

export async function onDisplayNotification(title,message) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  notifee.displayNotification({
    title: title,
    body: message,
  });


}
