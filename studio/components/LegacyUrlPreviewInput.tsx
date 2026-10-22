import {Card, Text} from '@sanity/ui';
import type {StringInputProps} from 'sanity';

export function LegacyUrlPreviewInput(props: StringInputProps) {
  const url = typeof props.value === 'string' ? props.value.trim() : '';

  return (
    <div style={{display: 'grid', gap: 12}}>
      {url ? (
        <Card border padding={2} radius={2}>
          <div style={{display: 'grid', gap: 8}}>
            <img
              src={url}
              alt="معاينة الصورة الحالية"
              style={{display: 'block', width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 6}}
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
            <Text size={1} muted>
              رابط قديم محفوظ للتوافق — لم يتم تغييره
            </Text>
          </div>
        </Card>
      ) : (
        <Card border padding={3} radius={2} tone="transparent">
          <Text size={1} muted>لا توجد صورة مرتبطة بهذا الحقل حالياً.</Text>
        </Card>
      )}
      {props.renderDefault(props)}
    </div>
  );
}
