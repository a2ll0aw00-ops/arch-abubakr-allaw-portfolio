import {Card, Text} from '@sanity/ui';

export function LegacyUrlArrayPreviewInput(props: any) {
  const urls = Array.isArray(props.value)
    ? props.value.filter((value: unknown): value is string => typeof value === 'string' && value.trim().length > 0)
    : [];

  return (
    <div style={{display: 'grid', gap: 12}}>
      {urls.length > 0 && (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8}}>
          {urls.map((url: string, index: number) => (
            <Card border padding={1} radius={2} key={`${url}-${index}`}>
              <img
                src={url}
                alt={`معاينة الصورة الحالية ${index + 1}`}
                style={{display: 'block', width: '100%', height: 100, objectFit: 'cover', borderRadius: 4}}
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            </Card>
          ))}
        </div>
      )}
      <Text size={1} muted>
        روابط قديمة محفوظة للتوافق — لم يتم تغييرها. استخدم معرض الصور المرفوع لإضافة صور جديدة.
      </Text>
      {props.renderDefault(props)}
    </div>
  );
}
