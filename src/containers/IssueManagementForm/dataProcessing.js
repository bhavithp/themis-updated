import React from 'react';
import PopoverBox from '../../features/popoverbox/PopoverBox';
import TruncateText from '../../features/truncatetext/TruncateText';

export function getColumns() {

    return [
        { dataField: 'code', text: 'Product Code' },
        { dataField: 'name', text: 'Content Title' },
        { dataField: 'series', text: 'Content Series' },
        { dataField: 'type', text: 'Content Type' },
        { dataField: 'delivery_format', text: 'Delivery Format' },
        { dataField: 'program_count', text: 'Program Count' },
        {
            dataField: 'program_name', text: 'Program Name',
            headerStyle: (column, colIndex) => {
                return { width: '180px', textAlign: 'center' };
            },
            formatter: (cell, row) => {
                if (cell !== undefined) {
                    // const truncate = <TruncateText truncFrom="start" lines={2} ellipsis={<span>...</span>} bodyData={cell.toString()} />;
                    const truncate = <TruncateText text={cell.toString()} maxLength={100} />;
                    return <PopoverBox bodyData={cell.toString()} headerText="Program Names" overlayBodyData={truncate} placement="left" />
                }
            }
        }
    ];
}

export function getFilterTableColumns() {
    return [
        { dataField: 'code', text: 'Product Code' }
    ]
}

export function getReviewAndSubmitTableColumn() {

    return [
        {
            dataField: 'product_code',
            text: 'Product Code',
            editable: false
        },
        // {
        //     dataField: 'name', 
        //     text: 'Name',
        //     editable: false
        // },
        // {
        //     dataField: 'content_type', 
        //     text: 'Content Type',
        //     editable: false
        // },
        // {
        //     dataField: 'content_series', 
        //     text: 'Content Series',
        //     editable: false
        // },
        // {
        //     dataField: 'delivery_format', 
        //     text: 'Delivery Format',
        //     editable: false
        // },
        {
            dataField: 'issue_description',
            text: 'Description',
            editable: false
        },
        {
            dataField: 'product_team',
            text: 'Product Team',
            editable: false
            // editor: {
            //     type: Type.SELECT,
            //     getOptions: (setOptions, {row, column}) =>{                   
            //         console.log('setOptions: ', setOptions)
            //         console.log('row: ', row);
            //         var obj = [];
            //         product_teams().forEach(element => {
            //             obj.push({value: element, label: element })
            //         });
            //         return obj;

            //     } 
            // }
        },
        {
            dataField: 'issue_priority',
            text: 'Issue Priority',
            editable: false
            // editor: {
            //     type: Type.SELECT,
            //     getOptions: (setOptions, { row, column }) => {
            //       var obj = [];
            //       issue_priorities().forEach(element => {
            //         obj.push({value: element, label: element })
            //       });
            //       return obj;
            //     }
            // }
        },
        {
            dataField: 'issue_type',
            text: 'Issue Type',
            editable: false
            // editor: {
            //     type: Type.SELECT,
            //     getOptions: (setOptions, { row, column }) => {
            //       var obj = [];
            //       issue_types().forEach(element => {
            //         obj.push({value: element, label: element })
            //       });
            //       return obj;
            //     }
            // }     

        },
        {
            dataField: 'jira_issue_id',
            text: 'JIRA Issue ID',
            editable: false
        }

    ];
}

// Arrays of Delivery Format CUID
export const restricted_delivery_formats = ["A-ODELFORM-00030"];

export function createRequiredDataSet(obj) {

    var result = [];
    for (var o in obj.data) {
        if (!restricted_delivery_formats.includes(obj.data[o].delivery_format_cuid)) {
            var temp_result = {
                'code': obj.data[o].code,
                'type': obj.data[o].type,
                'series': obj.data[o].series,
                'name': obj.data[o].name,
                'delivery_format': obj.data[o].delivery_format,
                'program_count': obj.data[o].program_count,
                'program_name': obj.data[o].program_name
            }
            result.push(temp_result);
        }
    }

    return result;

}

export const product_teams = () => {
    return [
        { id: "Assessment Team- English", title: "Assessment Team- English" },
        { id: "Digital Assets", title: "Digital Assets" },
        { id: "Digital Publishing Team", title: "Digital Publishing Team" },
        { id: "Editorial Team- ELD", title: "Editorial Team- ELD" },
        { id: "Editorial Team- English", title: "Editorial Team- English" },
        { id: "Editorial Team- Spanish", title: "Editorial Team- Spanish" },
        { id: "Product Reprint Team", title: "Product Reprint Team" }
    ]
}

export const issue_types = () => {
    return [
        { id: "Content - Error", title: "Content - Error" },
        { id: "Content - Omission", title: "Content - Omission" },
        { id: "Functionality", title: "Functionality" },
        { id: "Permissions - Image", title: "Permissions - Image" },
        { id: "Permissions - Text", title: "Permissions - Text" }
    ];
}

export const issue_priorities = () => {
    return [
        { id: "Tier 1: grammatical/typographical errors", title: "Tier 1: grammatical/typographical errors" },
        { id: "Tier 2: content change requiring editorial supervisor involvement", title: "Tier 2: content change requiring editorial supervisor involvement" },
        { id: "Tier 3: content change requiring publisher involvement", title: "Tier 3: content change requiring publisher involvement" }
    ];
}

const tech_support_review_yes = "Yes, require Tech Support / Customer Service Review";
const tech_support_review_no = "No, skip Tech Support / Customer Service Review";

export const tech_support_review = () => {
    return [
        { id: tech_support_review_yes, title: tech_support_review_yes },
        { id: tech_support_review_no, title: tech_support_review_no }
    ];
}

export const product_team_lead_map = () => {
    return {
        "Assessment Team- English": "jannin@benchmarkeducation.com",
        "Editorial Team- Spanish": "jmendoza@benchmarkeducation.com",
        "Editorial Team- English": "mprinz@benchmarkeducation.com",
        "Editorial Team- ELD": "swatterson@benchmarkeducation.com",
        "Digital Assets": "cmclean@benchmarkeducation.com",
        "Digital Publishing Team": "efernandez@benchmarkeducation.com",
        "Metadata Team": "dhaggerty@benchmarkeducation.com",
        "SAAS Team": "ggiordano@benchmarkeducation.com",
        "Product Reprint Team": null
    }
}

export const createStoryIssueJson = (issueInformation) => {

    var lead_map = product_team_lead_map();
    const issue_story = 10100;

    var field_json = {
        "fields": {
            "project": {
                // "id": project
                "key": issueInformation.project
            },
            "summary": issueInformation.issue_name,
            "description": issueInformation.issue_description,
            "labels": issueInformation.issue_labels,
            "issuetype": {
                id: issue_story
            },
            "customfield_10871": issueInformation.product_code,
            "customfield_10899": { "value": issueInformation.issue_source },
            "customfield_10900": issueInformation.tech_support_review === tech_support_review_yes ? { value: "Required" } : { value: "Skipped" },
            // "customfield_10896": issueInformation.product_affected_version
            "customfield_10906": [issueInformation.issue_group_number],
            "reporter": {
                "id": issueInformation.issue_reporter
            },
            "priority": { "name": issueInformation.issue_priority },
            "components": [
                {
                    "name": issueInformation.product_team
                }
            ]
        }
    };

    if (lead_map.hasOwnProperty(issueInformation.product_team)) {

        field_json["fields"]["customfield_10866"] = { "value": issueInformation.product_team };

    }
    if (issueInformation.product_team === 'Product Reprint Team') {

        field_json["fields"]["customfield_10909"] = { "name": "Product Reprint Team" }
    }

    return field_json;
}