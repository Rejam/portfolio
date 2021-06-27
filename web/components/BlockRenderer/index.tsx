import { Text, Heading, Box } from "@chakra-ui/react";
import BlockContent, {
  BlockContentProps,
} from "@sanity/block-content-to-react";

//   types: {
//     block: {
//       h1: (props: any) => {
//         return <Heading>{props.node.text}</Heading>;
//       },
//     },
//     text: (props: any) => <Text color="red">{props.node.text}</Text>,
//     span: (props: any) => {
//       console.log({ props });
//       return (
//         <Text as="span" color="green">
//           {props.node.text}
//         </Text>
//       );
//     },
//     code: (props: any) => (
//       <pre data-language={props.node.language}>
//         <code>{props.node.code}</code>
//       </pre>
//     ),
//   },
// };

const blockRenderer = (props: any) => {
  const { style = "normal" } = props.node;

  if (style === "normal")
    return (
      <Text as="p" textStyle="body">
        {props.children}
      </Text>
    );

  // for headings
  if (style === "h1")
    return (
      <Heading as="h1" textStyle="h1">
        {props.children}
      </Heading>
    );

  if (style === "blockquote") {
    return <blockquote>- {props.children}</blockquote>;
  }

  // Fall back to default handling
  return props;
};

const strong = (props: any) => {
  return (
    <Box as="span" fontWeight="bolder">
      {props.children}
    </Box>
  );
};
const highlight = (props: any) => {
  console.log("highlight props", { props });

  return (
    <Box
      as="span"
      bg="yellow"
      borderStyle="solid"
      borderColor="yellow.400"
      borderBottomWidth="1px"
      borderTopWidth="1px"
      _first={{
        borderLeftWidth: "1px",
      }}
      _last={{
        borderRightWidth: "1px",
      }}
    >
      {props.children}
    </Box>
  );
};
const marks: any = {
  strong,
  highlight,
};

export default function BlockRenderer(blocks: { blocks: BlockContentProps }) {
  return (
    <BlockContent
      blocks={blocks.blocks}
      serializers={{
        types: {
          block: blockRenderer,
        },
        marks,
      }}
      projectId="evl27pvd"
      dataset="production"
    />
  );
}
