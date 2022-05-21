import styled from 'styled-components';

export const Disclaimer = styled.div`
  margin: 20px 0;
  border: 1px solid #ccc;
  padding: 20px;
`;

export const DisclaimerList = styled.ul`
  margin: 15px;
  font-size: small;
`;

export const DisclaimerListItem = styled.li`
  line-height: 24px;
`;

export const FooterText = styled.div`
  font-size: 12px;
  text-align: left;
  margin: 20px 0;
`;

export default function Footer({ showDisclaimer }: any) {
  return (
    <div>
      {showDisclaimer && (
        <Disclaimer>
          <h4>Disclaimer</h4>
          <DisclaimerList>
            <DisclaimerListItem>
              This service is 100% free and our aim is to make it easier to
              manage relief distribution. More features will be added in coming
              days.
            </DisclaimerListItem>
            <DisclaimerListItem>
              The information contained herein has been incorporated into this
              system by various individuals or organizations, and we kindly
              request you to look into its accuracy and act responsibly.
            </DisclaimerListItem>
            <DisclaimerListItem>
              This service does not collect any money or collect and store food,
              medicine etc. We facilitate the coordination between parties who
              can provide assistance and individuals or organizations in need of
              relief.
            </DisclaimerListItem>
            <DisclaimerListItem>
              This web service is a voluntary service and a community powered
              project. Join the GitHub page for more information and to help
              improve the service.
            </DisclaimerListItem>
          </DisclaimerList>

          <DisclaimerList>
            <DisclaimerListItem>
              මෙම සේවාව 100% නොමිලේ වන අතර හුදෙක් සහන සැළසීම කළමනාකරණයට පහසුවක්
              සැලසිම අපේ අරමුණයි. නුදුරු දිනයන් තුළ තවත් විශේෂාංග අතුළත් වනු ඇත.
            </DisclaimerListItem>
            <DisclaimerListItem>
              මෙහි පද්ධතියේ අඩංගු තොරතුරු විවිධ පුද්ගලයින් සහ සංවිධානය විසින්
              එක් කර ඇති අතර ඒවායේ නිරවද්‍යතාව පරීක්ෂාකර බලා වගකීම් සහගතව
              ක්‍රියා කරන මෙන් අපි ඔබගෙන් කාරුණිකව ඉල්ලා සිටිමු.
            </DisclaimerListItem>
            <DisclaimerListItem>
              මෙම සේවාව කිසිදු අයුරකින් මුදල් එකතු කිරීම හෝ ආහාර, ඖෂධ වැනි දෑ
              එකතු කිරීම හෝ ගබඩා කිරීම සිදු නොකරයි. අප උපකාර සැපයිය හැකි පාර්ශව
              සහ උපකාර අවශ්‍ය පුද්ගලයින් හෝ සංවිධානය අතර සම්බන්ධීකරණය පමණක් සිදු
              කරන්නෙමු.
            </DisclaimerListItem>
            <DisclaimerListItem>
              මෙම වෙබ් සේවාව පවත්වාගෙන යාම ස්වේච්ඡා සේවවක් වන අතර මෙය ප්‍රජාව
              විසින් බලගැන්වෙන් ව්‍යාපෘතියකි. වැඩිදුර තොරතුරු ලබා ගැනීමට සහ
              සේවාව වැඩි දියුණු කිරීමට උදව් කිරීම සදහා GitHub පිටුවට සම්බන්ධ
              වෙන්න.
            </DisclaimerListItem>
          </DisclaimerList>

          <DisclaimerList>
            <DisclaimerListItem>
              100% இலவசமான இச்சேவையின் நோக்கம் நிவாரண பகிர்ந்தளித்தலை
              எளிதாக்குவதே. வரும் நாட்களில் கூடுதல் அம்சங்கள் சேர்க்கப்படும்.
            </DisclaimerListItem>
            <DisclaimerListItem>
              இதில் உள்ள தகவல்கள் பல்வேறு தனிநபர்கள் அல்லது அமைப்புகளால் இந்த
              அமைப்பில் இணைக்கப்பட்டுள்ளன, மேலும் இதன் துல்லியத்தை ஆராய்ந்து
              பொறுப்புடன் செயல்படுமாறு உங்களை அன்புடன் கேட்டுக்கொள்கிறோம்.
            </DisclaimerListItem>
            <DisclaimerListItem>
              இச்சேவையின் மூலம் பணம் வசூலிக்கப்படுவதில்லை, மற்றும் உணவு, மருந்து
              போன்றவற்றைச் சேகரித்து அல்லது சேமித்து வைப்பதில்லை. உதவி
              வழங்கக்கூடிய தரப்பினருக்கும், நிவாரணம் தேவைப்படும் தனிநபர்கள்
              அல்லது நிறுவனங்களுக்கும் இடையே ஒருங்கிணைப்பை நாங்கள்
              எளிதாக்குகிறோம்.
            </DisclaimerListItem>
            <DisclaimerListItem>
              இந்த இணைய சேவை தன்னார்வ சேவை மற்றும் சமூகத்தால் இயங்கும்
              திட்டமாகும். மேலதிக தகவல்களுக்கு மற்றும் சேவையை மேம்படுத்த
              உதவுவததற்கு GitHub பக்கத்தில் இணையவும்.
            </DisclaimerListItem>
          </DisclaimerList>
        </Disclaimer>
      )}

      <FooterText>
        &copy; 2017-2022 &bull; ReliefSupports - Sri Lanka
      </FooterText>
    </div>
  );
}
