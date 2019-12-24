const PDFDocument = require('pdfkit');
const doc = new PDFDocument();
const fs = require('fs');
function addPDF(req, res, next) {
    let count = 11;
    const exper = false;
    const exper1 = false;
    const exper2 = false
    function getObj(getObject, positionNumber) {
        positionNumber += 1
        for (let [key, value] of Object.entries(getObject)) {
            if (count === 36) {
                doc.addPage()
                console.log(count)
                count += 1
            }
            if (count >= 36) {
                count = +1
            }
            else if (count <= 35) {
                if (positionNumber === 1) {
                    doc.moveTo(0, parseInt(`${count * 20}`) - 5).lineTo(600, parseInt(`${count * 20}`) - 5).lineWidth(2).stroke()
                }
                if (typeof value === 'object') {
                    doc.fontSize(12)
                        .fillColor('blue')
                        .text(key, parseInt(`${positionNumber * 20}`), parseInt(`${count * 20}`));
                    count += 1
                    getObj(value, positionNumber)
                }
                else {
                    doc.fontSize(12)
                        .fillColor('blue')
                        .text(key, parseInt(`${positionNumber * 20}`), parseInt(`${count * 20}`));
                    doc.fontSize(10)
                        .fillColor('black')
                        .text(value, parseInt(`${positionNumber * 20}`) + 130, parseInt(`${count * 20}`));
                       if(positionNumber>1){
                        doc.moveTo(0,  parseInt(`${count * 20}`)+15).lineTo(600, parseInt(`${count * 20}`)+15).lineWidth(0,1).stroke()
                       }
                    count += 1
                }
            }
        }
    }
    const analyse = {
       
        visual_activity: 'formData.visualActivityKind ? visualActivityText : undefined',
        previous_optic: {
            kind: 'formData.previousOpticRadio',
            optic_type: 'formData.lenseKind : undefined)',
            optic_data: (!exper) ? {
                OD: {
                    sph: 'validateValue(formData.glass_od_sph)',
                    cyl: 'validateValue(formData.glass_od_cyl)',
                    ax: 'validateValue(formData.glass_od_ax)',
                    add: 'validateValue(formData.glass_od_add)'
                },
                OS: {
                    sph: 'validateValue(formData.glass_os_sph)',
                    cyl: 'validateValue(formData.glass_os_cyl)',
                    ax: 'validateValue(formData.glass_os_ax)',
                    add: 'validateValue(formData.glass_os_add)'
                },
                DPP: 'validateValue(formData.glass_dpp)',
                od1: 'validateValue(formData.glass_od)',
                os1: 'validateValue(formData.glass_os)'
            } : ((!exper1) ? {
                OD: {
                    sph: 'validateValue(formData.lense_od_sph)',
                    cyl: 'validateValue(formData.lense_od_cyl)',
                    ax: 'validateValue(formData.lense_od_ax)',
                    add: 'validateValue(formData.lense_od_add)',
                    bc: 'validateValue(formData.lense_od_bc)',
                    dia: 'validateValue(formData.lense_od_dia)'
                },
                OS: {
                    sph: 'validateValue(formData.lense_os_sph)',
                    cyl: 'validateValue(formData.lense_os_cyl)',
                    ax: 'validateValue(formData.lense_os_ax)',
                    add: 'validateValue(formData.lense_os_add)',
                    bc: 'validateValue(formData.lense_os_bc)',
                    dia: 'validateValue(formData.lense_os_dia)'
                }
            } : undefined),
            wear_duration: (!exper2) ? 'formData.glass_wear_duration' : ((exper2) ? 'formData.lense_wear_duration' : undefined),
        },
        arkm: {
            OD: {
                sph: 'validateValue(formData.arkm_od_sph)',
                cyl: 'validateValue(formData.arkm_od_cyl)',
                ax: 'validateValue(formData.arkm_od_ax)',
                bc: 'validateValue(formData.arkm_od_bc)',
                dia: 'validateValue(formData.arkm_od_dia)'
            },
            OS: {
                sph: 'validateValue(formData.arkm_os_sph)',
                cyl: 'validateValue(formData.arkm_os_cyl)',
                ax: 'validateValue(formData.arkm_os_ax)',
                bc: 'validateValue(formData.arkm_os_bc)',
                dia: 'validateValue(formData.arkm_os_dia)'
            },
            DP: 'validateValue(formData.arkm_dp)'
        },
        visometry: {
            OD: 'formData.visometry_od',
            OS: 'formData.visometry_os'
        },
        correction: {
            maximal: {
                OD: {
                    sph: 'validateValue(formData.correction_max_od_sph)',
                    cyl: 'validateValue(formData.correction_max_od_cyl)',
                    ax: 'validateValue(formData.correction_max_od_ax)',
                    add: 'validateValue(formData.correction_max_od_add)'
                },
                OS: {
                    sph: 'validateValue(formData.correction_max_os_sph)',

                    cyl: 'validateValue(formData.correction_max_os_cyl)',
                    ax: 'validateValue(formData.correction_max_os_ax)',
                    add: 'validateValue(formData.correction_max_os_add)'
                }
            },
            tolerable: {
                OD: {
                    sph: ' validateValue(formData.correction_od_sph)',
                    cyl: 'validateValue(formData.correction_od_cyl)',
                    ax: 'validateValue(formData.correction_od_ax)',
                    add: 'validateValue(formData.correction_od_add)'
                },
                OS: {
                    sph: 'validateValue(formData.correction_os_sph)',
                    cyl: 'validateValue(formData.correction_os_cyl)',
                    ax: 'validateValue(formData.correction_os_ax)',
                    add: 'validateValue(formData.correction_os_add)'
                }
            }
        },
        biomicroscopy: {
            OU: 'validateValue(formData.biomicroscopy_ou)',
            OD: 'validateValue(formData.biomicroscopy_od)',
            OS: 'validateValue(formData.biomicroscopy_os)'
        },
        oftalmoscopy: {
            OU: 'validateValue(formData.oftalmoscopy_ou)',
            OD: 'validateValue(formData.oftalmoscopy_od)',
            OS: 'validateValue(formData.oftalmoscopy_os)'
        },
        pnevmotonometry: {
            OD: 'formData.pnevmotonometry_od',
            OS: 'formData.pnevmotonometry_os'
        },
        conclusion: 'validateValue(formData.analyse_finally)',
        recipe: {
            OD: {
                sph: 'validateValue(formData.buying_od_sph)',
                cyl: 'validateValue(formData.buying_od_cyl)',
                ax: 'validateValue(formData.buying_od_ax)',
                add: 'validateValue(formData.buying_od_add)',
                bc: 'validateValue(formData.buying_od_bc)',
                dia: 'validateValue(formData.buying_od_dia)'
            },
            OS: {
                sph: 'validateValue(formData.buying_os_sph)',
                cyl: 'validateValue(formData.buying_os_cyl)',
                ax: 'validateValue(formData.buying_os_ax)',
                add: 'validateValue(formData.buying_os_add)',
                bc: 'validateValue(formData.buying_os_bc)',
                dia: 'validateValue(formData.buying_os_dia)'
            },
            DPP: 'validateValue(formData.buying_dpp)',
        }
    }
    getObj(analyse, 0)
    doc.pipe(fs.createWriteStream('/file.pdf'));
    doc.pipe(res);
    doc.end()
    next()
}

module.exports = addPDF;